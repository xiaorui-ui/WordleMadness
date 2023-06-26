package wordle_madness.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@RequestMapping(path="/backend")
public class MainController {

    private static final String FRONTEND = "https://wordle-madness.vercel.app";
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins=FRONTEND)
    @PatchMapping(path="/addWord")
    public @ResponseBody String addWord(@RequestParam String username, @RequestParam String word) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addWord(word);
        return "Success";
    }
    @CrossOrigin(origins=FRONTEND)
    @PatchMapping(path="/addAllowedWord")
    public @ResponseBody String addAllowedWord(@RequestParam String username, @RequestParam String word) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addAllowedWord(word);
        return "Success";
    }
    @CrossOrigin(origins=FRONTEND)
    @PatchMapping(path="/deleteWord")
    public @ResponseBody String deleteWord(@RequestParam String username, @RequestParam String word) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteWord(word);
        return "Success";
    }
    @CrossOrigin(origins=FRONTEND)
    @PatchMapping(path="/deleteAllowedWord")
    public @ResponseBody String deleteAllowedWord(@RequestParam String username, @RequestParam String word) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteAllowedWord(word);
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
    public @ResponseBody ArrayList<String> getWordList (@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getWordList();
    }

    @CrossOrigin(origins=FRONTEND)
    @GetMapping(path="/getAllowedWords")
    public @ResponseBody ArrayList<String> getAllowedList (@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getAllowedList();
    }
}