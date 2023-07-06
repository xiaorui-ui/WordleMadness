package wordle_madness.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@CrossOrigin(origins = "${spring.datasource.frontend}")
@RequestMapping(path = "/backend")
public class MainController {
    @Autowired
    private UserRepository userRepository;

    @PatchMapping(path = "/addWords")
    public @ResponseBody String addWords(@RequestParam String username, @RequestParam String[] words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addWords(words);
        userRepository.save(currentUser);
        return "Success";
    }

    @PatchMapping(path = "/addAllowedWords")
    public @ResponseBody String addAllowedWords(@RequestParam String username, @RequestParam String[] words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addAllowedWords(words);
        userRepository.save(currentUser);
        return "Success";
    }

    @PatchMapping(path = "/deleteWords")
    public @ResponseBody String deleteWords(@RequestParam String username, @RequestParam String[] words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteWords(words);
        userRepository.save(currentUser);
        return "Success";
    }

    @PatchMapping(path = "/deleteAllowedWords")
    public @ResponseBody String deleteAllowedWords(@RequestParam String username, @RequestParam String[] words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteAllowedWords(words);
        userRepository.save(currentUser);
        return "Success";
    }

    @GetMapping(path = "/verify")
    public @ResponseBody String conditionalLogin(@RequestParam String name, @RequestParam String password) {
        if (userRepository.existsUserByNameAndPassword(name, password)) {
            return "Logged in";
        }
        return "Invalid login details";
    }

    @PostMapping(path = "/register")
    public @ResponseBody String registerUser(@RequestParam String name, @RequestParam String password) {
        if (userRepository.existsUserByName(name)) {
            return "User already exists";
        } else {
            User newUser = new User(name, password);
            userRepository.save(newUser);
            return "Registered";
        }
    }

    @GetMapping(path = "/getWords")
    public @ResponseBody ArrayList<String> getWordList(@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getWordList();
    }

    @GetMapping(path = "/getAllowedWords")
    public @ResponseBody ArrayList<String> getAllowedList(@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getAllowedList();
    }
}