package wordle_madness.backend;

import jakarta.persistence.*;
import wordle_madness.backend.algo.*;

import java.util.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String password;

    // private NestedMap<Integer, String, List<String>> tree;
    @Column(length = Integer.MAX_VALUE)
    private String tree;

    private boolean isLoggedIn;

    private final String[] defaultWords = { "moral", "coral", "royal",
            "rival", "flora", "mural", "lycra", "rural", "viral", "aural", "rally", "regal", "trial",
            "renal", "glare", "blare", "flare" };

    private final String[] defaultAllowedWords = { "moral", "coral", "royal",
            "rival", "flora", "mural", "lycra", "rural", "viral", "aural", "rally", "regal", "trial",
            "renal", "glare", "blare", "flare" };
    @Column(length = Integer.MAX_VALUE)
    private ArrayList<String> wordList;
    @Column(length = Integer.MAX_VALUE)
    private ArrayList<String> allowedList;

    // Default constructor
    public User() {
    }

    public User(String name, String password) {
        setName(name);
        setPassword(password);
        this.wordList = new ArrayList<>();
        this.allowedList = new ArrayList<>();
        this.addWords(defaultWords);
        this.addAllowedWords(defaultAllowedWords);
        this.isLoggedIn = true;
        this.tree = "";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<String> getWordList() {
        return wordList;
    }

    public void addWords(String[] words) {
        for (String word : words) {
            wordList.add(word);
        }
    }

    public void deleteWords(String[] words) {
        for (String word : words) {
            wordList.remove(word);
        }
    }

    public ArrayList<String> getAllowedList() {
        return allowedList;
    }

    public void addAllowedWords(String[] words) {
        for (String word : words) {
            allowedList.add(word);
        }
    }

    public void deleteAllowedWords(String[] words) {
        for (String word : words) {
            allowedList.remove(word);
        }
    }

    public void setListsToSame() {
        // allowedList = wordList;
        allowedList = new ArrayList<>(wordList);
    }

    // might be a better idea to have setters for both logging in and out
    public void logIn() {
        this.isLoggedIn = true;
    }

    public void logOut() {
        this.isLoggedIn = false;
    }

    public boolean isLoggedIn() {
        return this.isLoggedIn;
    }

    public void setTree(Tree tree) {
        this.tree = tree.getTree();
    }

    public String getTree() {
        return this.tree;
    }

    // public void setTree(NestedMap<Integer, String, List<String>> tree) {
    // this.tree = tree;
    // }

    // public NestedMap<Integer, String, List<String>> getTree() {
    // return this.tree;
    // }

}
