package wordle_madness.backend.algo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

// The original version seems to be correct and faster for some reason
public class WordleMemo extends Wordle {
    public WordleMemo(List<String> allowed, List<String> ans, int l) {
        super(allowed, ans, l);
    }

    // To make it truly memoized, the hashmaps check(w, l) should NOT be computed
    // twice, again in the solve method.
    // But most of the list isn't in succ anyways, so how much does it really
    // matter?

    // Almost to no extent lmao.

    // No correctness issue here
    // Alt only
    // public List<Pair<String, HashMap<Integer, List<String>>>>
    // succMemo(List<String> l) {

    // This is slow because of the 'satellite data' so removed

    public NestedMap<Integer, String, List<String>> solveMemo(List<String> ans, int x) {
        int y = ans.size();
        if (y < 3) {
            NestedMap<Integer, String, List<String>> nm = new NestedMap<>(ans.get(0), List.of(ans.get(0)), 1);
            nm.put(c, null);
            if (y == 1) {
                return nm;
            }
            NestedMap<Integer, String, List<String>> nm2 = new NestedMap<>(ans.get(1), ans, 3);
            nm2.put(this.compare.get(ans.get(1)).get(ans.get(0)),
                    nm);
            nm2.put(c, null);
            return nm2;
        }

        if (y < 20) {
            int max = 0;
            int n = 0;
            HashMap<Integer, List<String>> g = new HashMap<>();
            for (int i = 0; i < y; i++) {
                HashMap<Integer, List<String>> h = this.check(ans.get(i), ans);
                if (h.size() == y) {
                    NestedMap<Integer, String, List<String>> nm = new NestedMap<>(ans.get(i), ans, 2 * y - 1);
                    for (int j : h.keySet()) {
                        nm.put(j, this.solveMemo(h.get(j), x));
                    }
                    nm.replace(c, null);
                    return nm;
                }
                if (h.size() > max) {
                    max = h.size();
                    n = i;
                    g = h;
                }
            }
            if (max == y - 1) {
                NestedMap<Integer, String, List<String>> nm = new NestedMap<>(ans.get(n), ans, 2 * y);
                for (int j : g.keySet()) {
                    nm.put(j, this.solveMemo(g.get(j), x));
                }
                nm.replace(c, null);
                return nm;
            }
        }

        List<String> l = this.succ(ans, x);
        NestedMap<Integer, String, List<String>> max = new NestedMap<>();
        max.setTries(Integer.MAX_VALUE);
        NestedMap<Integer, String, List<String>> n = l.stream().parallel()
                .map(z -> this.miniSolveMemo(z, ans, x))
                .reduce(max,
                        (z, aa) -> (z.getTries() < aa.getTries()) ? z : aa);
        return n;
    }

    public NestedMap<Integer, String, List<String>> miniSolveMemo(String s, List<String> l, int x) {
        // public Pair<Tree<String, Integer>, Integer> miniSolveMemo(Pair<String,
        // HashMap<Integer, List<String>>> p
        // , List<String> l) {

        int sum = 0;

        HashMap<Integer, List<String>> h = this.check(s, l); // for original

        // String s = p.getFst();
        // HashMap<Integer, List<String>> h = p.getSnd(); // alt

        NestedMap<Integer, String, List<String>> nm = new NestedMap<>(s, l);

        if (h.size() == 1) {
            return new NestedMap<>(null, null, Integer.MAX_VALUE);
        }
        for (int j : h.keySet()) {
            NestedMap<Integer, String, List<String>> nm1 = this.solveMemo(h.get(j), x);
            sum += nm1.getTries();
            nm.put(j, nm1);
            // initialise the lists for everything
            // nm.get(j).setW(h.get(j));
        }

        sum += l.size();

        if (h.containsKey(c)) {
            sum -= 1;
            nm.replace(c, null);
        }
        nm.setTries(sum);
        return nm;
    }

    public static List<List<String>> print(NestedMap<Integer, String, List<String>> nm) {
        if (nm == null) {
            List<List<String>> l = new ArrayList<>();
            l.add(new ArrayList<String>());
            return l;
        }
        List<List<String>> l = new ArrayList<>();
        for (Integer i : nm.keySet()) {
            l.addAll(print(nm.get(i)));
        }
        for (List<String> li : l) {
            li.add(0, nm.getV());
        }
        return l;
    }

}
