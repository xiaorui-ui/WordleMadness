package wordle_madness.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.data.util.Pair;

import java.util.ArrayList;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String password;

    private ArrayList<String> wordList = new ArrayList<>();

    private ArrayList<String> allowedList = new ArrayList<>();

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

    public ArrayList<Pair<String, Boolean>> getWordList() {
        ArrayList<Pair<String, Boolean>> words = new ArrayList<>();
        wordList.forEach((word) -> {
            boolean remove = word.charAt(0) == '1';
            String wordString = word.substring(1);
            words.add(Pair.of(wordString, remove));
        });
        return words;
    }

    public void addWord(String word) { wordList.add(word); }

    public void deleteWord(String word) { wordList.remove(word); }

    public ArrayList<Pair<String, Boolean>> getAllowedList() {
        ArrayList<Pair<String, Boolean>> allowedWords = new ArrayList<>();
        allowedList.forEach((word) -> {
            boolean remove = word.charAt(0) == '1';
            String wordString = word.substring(1);
            allowedWords.add(Pair.of(wordString, remove));
        });
        return allowedWords;
    }

    public void addAllowedWord(String word) { allowedList.add(word); }

    public void deleteAllowedWord(String word) { allowedList.remove(word); }
}
