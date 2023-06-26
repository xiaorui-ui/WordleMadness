package wordle_madness.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@Controller
@RequestMapping(path="/backend")
public class MainController {

    private static final String FRONTEND = "https://wordle-madness.vercel.app";
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins=FRONTEND)
    @PatchMapping(path="/addWord")
    public @ResponseBody String addNewWord (@RequestParam String username, @RequestParam String word) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addWord(word);
        return "Success";
    }
    @CrossOrigin(origins=FRONTEND)
    @RequestMapping(path="/verify")
    public @ResponseBody String conditionalLogin(@RequestParam String name
            , @RequestParam String password) {
        if (!userRepository.existsUserByName(name)) {
            User n = new User();
            n.setName(name);
            n.setPassword(password);
            userRepository.save(n);
            return "Logged in";
        }
        if (userRepository.existsUserByNameAndPassword(name, password)) {
            User loggedInUser = userRepository.findUserByName(name);
            return "Logged in";
        }
        return "Invalid login details";
    }
    @CrossOrigin(origins=FRONTEND)
    @GetMapping(path="/getWords")
    public @ResponseBody ArrayList<Pair<String, Boolean>> getWordList (@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getWordList();
    }

    @CrossOrigin(origins=FRONTEND)
    @GetMapping(path="/getAllowedWords")
    public @ResponseBody ArrayList<Pair<String, Boolean>> getAllowedList (@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getAllowedList();
    }
}