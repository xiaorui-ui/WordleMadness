package wordle_madness.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import wordle_madness.backend.algo.*;

import java.util.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@CrossOrigin(origins = "${spring.datasource.frontend}")
@RequestMapping(path = "/backend")
public class MainController {
    @Autowired
    private UserRepository userRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PostMapping(path = "/addWords")
    public @ResponseBody String addWords(@RequestParam String username, @RequestBody WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addWords(words.getWords());
        userRepository.save(currentUser);
        return "Success";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PostMapping(path = "/addAllowedWords")
    public @ResponseBody String addAllowedWords(@RequestParam String username, @RequestBody WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addAllowedWords(words.getWords());
        userRepository.save(currentUser);
        return "Success";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/deleteWords")
    public @ResponseBody String deleteWords(@RequestParam String username, @RequestBody WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteWords(words.getWords());
        userRepository.save(currentUser);
        return "Success";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/deleteAllowedWords")
    public @ResponseBody String deleteAllowedWords(@RequestParam String username, @RequestBody WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteAllowedWords(words.getWords());
        userRepository.save(currentUser);
        return "Success";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/setListsToSame")
    public @ResponseBody String setListsToSame(@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.setListsToSame();
        userRepository.save(currentUser);
        return "Success";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/verify")
    public @ResponseBody String conditionalLogin(@RequestParam String name, @RequestParam String password) {
        if (userRepository.existsUserByNameAndPassword(name, password)) {
            User currentUser = userRepository.findUserByName(name);
            if (currentUser.isLoggedIn()) {
                return "This user is already logged in. Please check that you have logged out of all other sessions";
            }
            currentUser.logIn();
            userRepository.save(currentUser);
            return "Logged in";
        } else if (userRepository.existsUserByName(name)) {
            return "Wrong password";
        }
        return "Username does not exist, please register for a new account";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/cachedLogIn")
    public @ResponseBody String cachedLogIn(@RequestParam String name) {
        if (userRepository.existsUserByName(name)) {
            User currentUser = userRepository.findUserByName(name);
            if (currentUser.isLoggedIn()) {
                return "This user is already logged in. Please check that you have logged out of all other sessions";
            }
            currentUser.logIn();
            userRepository.save(currentUser);
            return "Logged in";
        }
        return "Username does not exist";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/logOut")
    public @ResponseBody String conditionalLogOut(@RequestParam String name) {
        if (userRepository.existsUserByName(name)) {
            User currentUser = userRepository.findUserByName(name);
            currentUser.logOut();
            userRepository.save(currentUser);
            return "Logged out";
        }
        return "User does not exist";
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
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

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @GetMapping(path = "/getWords")
    public @ResponseBody ArrayList<String> getWordList(@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getWordList();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @GetMapping(path = "/getAllowedWords")
    public @ResponseBody ArrayList<String> getAllowedList(@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getAllowedList();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @GetMapping(path = "/getTree")
    public @ResponseBody String getTree(@RequestParam String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getTree();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, isolation = Isolation.SERIALIZABLE)
    @PatchMapping(path = "/compute")
    public @ResponseBody String leastTries(
            @RequestParam String username, @RequestParam int width) {
        User currentUser = userRepository.findUserByName(username);
        ArrayList<String> allowed = currentUser.getAllowedList();
        ArrayList<String> ans = currentUser.getWordList();
        ObjectMapper objectMapper = new ObjectMapper();
        NestedMap<Integer, String, List<String>> tree = new WordleMemo(allowed, ans,
                allowed.get(0).length())
                .solveMemo(ans, width);
        try {
            String treeString = objectMapper.writeValueAsString(tree);
            currentUser.setTree(new Tree(treeString));
            userRepository.save(currentUser);
            return treeString;
        } catch (JsonProcessingException j) {
            throw new Error("Error occurred when processing list!");
        }
    }

}
