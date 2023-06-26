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

    private ArrayList<String> wordList;

    private ArrayList<String> allowedList;

    public User() {
        this.wordList = new ArrayList<>();
        this.allowedList = new ArrayList<>();
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

    public ArrayList<String> getWordList() { return wordList; }

    public void addWord(String word) { wordList.add(word); }

    public void deleteWord(String word) { wordList.remove(word); }

    public ArrayList<String> getAllowedList() { return allowedList; }

    public void addAllowedWord(String word) { allowedList.add(word); }

    public void deleteAllowedWord(String word) { allowedList.remove(word); }
}
