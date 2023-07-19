package wordle_madness.backend.algo;

// import org.springframework.util.StopWatch;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Stream;

public class Wordle {

    // Answer list of words
    protected final List<String> ans;

    // Allowed list of words, answer must be a subset of answer
    protected final List<String> allowed;

    // Length of all the words
    protected final int l;

    // Value used to represent when the Wordle is solved(everything green)
    protected final int c;

    // 2 choices:
    // 1. HashMap<String, Integer>
    // 2. HashMap<String, HashMap<String, Integer>>
    // 2 is faster due to how hashing works(hashing doesn't work well when are
    // millions of keys)

    // Comparison table of words represented by a hashmap. key = allowed word, value
    // = (HashMap, key = answer word, value = comparison value)

    protected final ConcurrentHashMap<Pair<String, String>, Integer> compare;

    public Wordle(List<String> allowed, List<String> ans, int l) {
        this.allowed = allowed;
        this.ans = ans;
        this.l = l;
        this.c = (int) Math.pow(3, l) - 1;
        this.compare = Wordle.hash(allowed, ans, l);
    }

    // choice 1 implementation

    public static ConcurrentHashMap<Pair<String, String>, Integer> hash(List<String> allowed, List<String> ans, int l) {
        ConcurrentHashMap<Pair<String, String>, Integer> h = new ConcurrentHashMap<>(50000000, 0.75F);
        int allowedSize = allowed.size();
        int ansSize = ans.size();
        Stream<Pair<String, String>> s = Stream.iterate(0, x -> x < allowedSize, x -> x + 1)
                .map(x -> allowed.get(x))
                .flatMap(x -> Stream.iterate(0, y -> y < ansSize, y -> y + 1)
                        .map(y -> new Pair<>(x, ans.get(y))));
        s.parallel().forEach(pair -> {
            h.put(pair, compare(pair.getFst(), pair.getSnd(), l));
        });
        return h;
    }

    // choice 2 implementation, not used subsequently

    public static HashMap<String, Integer> hash2(List<String> allowed, List<String> ans, int l) {
        HashMap<String, Integer> h = new HashMap<>();
        for (int i = 0; i < allowed.size(); i++) {
            String s1 = allowed.get(i);
            for (int j = 0; j < ans.size(); j++) {
                String s2 = ans.get(j);
                h.put(s1 + s2, Wordle.compare(s1, s2, 5));
            }
        }
        return h;
    }

    // Comparison value (green/yellow/black) of allowed word against answer, i.e.
    // the colours you get when you put in the allowed word when the answer word is
    // the actual answer. The answer is then treated as an integer in base-3 from
    // right to left.

    // Note: The function is not commutative, interchanging a and b can give a
    // different answer. Order matters!

    public static int compare(String a, String b, int length) {
        assert (a.length() == length && b.length() == length);
        int[] arr1 = new int[length];
        int[] arr2 = new int[length];

        for (int i = 0; i < length; i++) {
            if (a.charAt(i) == b.charAt(i)) {
                arr1[i] = 2;
                arr2[i] = 2;
            }
        }

        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length; j++) {
                if (a.charAt(i) == b.charAt(j)) {
                    if (arr1[i] == 0 && arr2[j] == 0) {
                        arr1[i] = 1;
                        arr2[j] = 1;
                        break;
                    }
                }
            }
        }
        int ans = 0;
        for (int i = 0; i < length; i++) {
            ans += (int) arr1[i] * Math.pow(3, length - 1 - i);
        }
        arr2 = null;
        arr1 = null;
        return ans;
    }

    // We assume l is a subset of ans from now on.

    // Represents the partitions of w across l, as hashmap with key = comparison
    // value, value = the subset of l with that comparison value (represented as a
    // arraylist).

    public HashMap<Integer, List<String>> check(String w, List<String> l) {
        HashMap<Integer, List<String>> h = new HashMap<>();
        for (int j = 0; j < l.size(); j++) {
            String w2 = l.get(j);
            int key = this.compare.get(new Pair<>(w, w2));
            if (!h.containsKey(key)) {
                h.put(key, new ArrayList<String>());
            }
            h.get(key).add(w2);
        }
        return h;
    }

    // The sibling of the above function, but HashSet instead
    // So only contains the set of distinct comparisons

    public HashSet<Integer> checkSet(String w, List<String> l) {
        HashSet<Integer> h = new HashSet<>();
        for (int j = 0; j < l.size(); j++) {
            int key = this.compare.get(new Pair<>(w, l.get(j)));
            // Integer key = this.compare.get(word).get(l.get(j));
            if (!h.contains(key)) {
                h.add(key);
            }
        }
        return h;
    }

    // Pick the best t successors, based on number of groups(the larger the better),
    // including ties. For now, we can just pass t=5 into the function.

    public List<String> succ(List<String> l, int t) {
        int x = this.allowed.size();
        int y = ans.size();

        List<Pair<String, Integer>> groups = new ArrayList<>();
        for (int i = 0; i < x; i++) {
            String s = this.allowed.get(i);
            HashSet<Integer> h = this.checkSet(s, l);
            if (h.size() == y) {
                return List.of(s);
            }
            groups.add(new Pair<>(s, h.size()));
        }

        Collections.sort(groups, (z, zz) -> {
            return zz.getSnd() - z.getSnd();
        });

        int threshold = groups.get(Math.min(t, groups.size() - 1)).getSnd();
        List<String> li = new ArrayList<>();
        int i = 0;
        // If everything is a 2-partition any answer will do
        if (groups.get(0).getSnd() == 2) {
            return l.subList(0, 1);
        }
        // filter away all the 2-partitions
        while (i < x && groups.get(i).getSnd() >= Math.max(threshold, 3)) {
            li.add(groups.get(i).getFst());
            i++;
        }

        return li;
    }

    // Returns a pair, the first value is the best word to try, the second is the
    // total number of trials across all words in ans. e.g. If ans has 100 words,
    // and the average number of tries is 3.46, the function returns 100*3.46=346.

    public Pair<String, Integer> solve(List<String> ans, int t) {
        int y = ans.size();

        if (y < 3) {
            return new Pair<>(ans.get(0), 2 * y - 1);
        }

        // Happy case, return if there is a word in the answer that can (nearly)
        // partition every word into a different set. We assume this can't happen if
        // there are >20 words in the list. Choosing a word outside of the answer list
        // will not give a better outcome(proof requires math).

        if (y < 20) {
            int max = 0;
            String s = "";
            for (int i = 0; i < y; i++) {
                HashSet<Integer> h = this.checkSet(ans.get(i), ans);
                if (h.size() == y) {
                    return new Pair<>(ans.get(i), 2 * y - 1);
                }
                if (h.size() > max) {
                    max = h.size();
                    s = ans.get(i);
                }
            }
            if (max == y - 1) {
                return new Pair<>(s, 2 * y);
            }
        }

        List<String> l = this.succ(ans, t);

        // calls minisolve here
        return l.stream().parallel().map(x -> new Pair<>(x, this.miniSolve(x, ans, t)))
                .reduce(new Pair<String, Integer>("", 6 * y), (z, aa) -> (z.getSnd() < aa.getSnd()) ? z : aa);
    }

    // The total number of tries when the first try is parameter word. Calls solve,
    // recursive function.
    public int miniSolve(String word, List<String> ans, int t) {
        HashMap<Integer, List<String>> h = this.check(word, ans);
        // This bit is important! Else infinite loop if you keep trying the same word!
        if (h.size() == 1) {
            return Integer.MAX_VALUE;
        } else if (h.size() == ans.size()) {
            return 2 * ans.size();
        }

        int sum = 0;
        for (Integer j : h.keySet()) {
            // System.out.println(j + ", " + this.solve(h.get(j)).getSnd());
            sum += this.solve(h.get(j), t).getSnd();
        }
        sum += ans.size();

        // The case when the guess is instantly, for correctness.
        if (h.containsKey(c)) {
            sum -= 1;
        }
        return sum;
    }

    // for de-bugging
    public void print(List<String> ans, int k) {
        int x = allowed.size();

        List<Pair<String, Integer>> groups = new ArrayList<>();
        for (int i = 0; i < x; i++) {
            String s = allowed.get(i);
            HashSet<Integer> h = this.checkSet(s, ans);
            groups.add(new Pair<>(allowed.get(i), h.size()));
        }

        Collections.sort(groups, (z, zz) -> {
            return zz.getSnd() - z.getSnd();
        });

        for (int i = 0; i < Math.min(x, k); i++) {
            System.out.println(groups.get(i));
        }

    }

}
