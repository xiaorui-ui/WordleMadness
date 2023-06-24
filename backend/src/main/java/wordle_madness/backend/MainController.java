package wordle_madness.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/backend")
public class MainController {

    private static final String FRONTEND = "https://wordle-madness.vercel.app";
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins=FRONTEND)
    @PatchMapping(path="/add")
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
            return "Saved";
        }
        if (userRepository.existsUserByNameAndPassword(name, password)) {
            User loggedInUser = userRepository.findUserByName(name);
            return "Logged in: " + loggedInUser.getName() + loggedInUser.getWordList();
        }
        return "Invalid login details";
    }
}