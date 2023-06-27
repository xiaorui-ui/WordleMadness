package wordle_madness.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String password;

    private final String[] defaultWords = { "hello", "world" };

    private final String[] defaultAllowedWords = { "hallo", "wrdle" };

    private ArrayList<String> wordList;

    private ArrayList<String> allowedList;

    public void initialiseUser() {
        this.wordList = new ArrayList<>();
        this.allowedList = new ArrayList<>();
        this.addWords(defaultWords);
        this.addAllowedWords(defaultAllowedWords);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public ArrayList<String> getAllowedList() { return allowedList; }

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
