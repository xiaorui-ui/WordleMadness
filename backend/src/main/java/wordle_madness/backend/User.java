package wordle_madness.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String password;

    private final String[] defaultWords = { "crane", "jazzy", "fjord", "found" };

    private final String[] defaultAllowedWords = { "crane", "jazzy", "fjord", "found" };

    private ArrayList<String> wordList;

    private ArrayList<String> allowedList;

    // Default constructor
    public User() {}

    public User(String name, String password) {
        setName(name);
        setPassword(password);
        this.wordList = new ArrayList<>();
        this.allowedList = new ArrayList<>();
        this.addWords(defaultWords);
        this.addAllowedWords(defaultAllowedWords);
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
}
