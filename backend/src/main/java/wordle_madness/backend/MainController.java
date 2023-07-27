package wordle_madness.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "${spring.datasource.frontend}")
@RequestMapping(path = "/backend")
public class MainController {
    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private GuestManagementService guestManagementService;

    @PostMapping(path = "/addWords")
    public String addWords(@RequestParam String username, @RequestBody WordArray words) {
        userManagementService.addWords(username, words);
        return "Success";
    }

    @PostMapping(path = "/addAllowedWords")
    public String addAllowedWords(@RequestParam String username, @RequestBody WordArray words) {
        userManagementService.addAllowedWords(username, words);
        return "Success";
    }

    @PatchMapping(path = "/deleteWords")
    public String deleteWords(@RequestParam String username, @RequestBody WordArray words) {
        userManagementService.deleteWords(username, words);
        return "Success";
    }

    @PatchMapping(path = "/deleteAllowedWords")
    public String deleteAllowedWords(@RequestParam String username, @RequestBody WordArray words) {
        userManagementService.deleteAllowedWords(username, words);
        return "Success";
    }

    @PatchMapping(path = "/setListsToSame")
    public String setListsToSame(@RequestParam String username) {
        userManagementService.setListsToSame(username);
        return "Success";
    }

    // Mechanism for standard login (verification of details)
    @PatchMapping(path = "/verify")
    public String conditionalLogin(@RequestParam String name, @RequestParam String password) {
        return userManagementService.conditionalLogin(name, password);
    }

    @PatchMapping(path = "/logOut")
    public String logOut(@RequestParam String name) {
        return userManagementService.logOut(name);
    }

    @PatchMapping(path = "/cachedLogIn")
    public String cachedLogIn(@RequestParam String name) {
        return userManagementService.cachedLogIn(name);
    }

    // Mechanism for registration
    @PostMapping(path = "/register")
    public String registerUser(@RequestParam String name, @RequestParam String password,
                                             @RequestBody DoubleWordArray initialWords) {
        return userManagementService.registerUser(name, password, initialWords);
    }

    @GetMapping(path = "/getWords")
    public ArrayList<String> getWordList(@RequestParam String username) {
        return userManagementService.getWordList(username);
    }

    @GetMapping(path = "/getAllowedWords")
    public ArrayList<String> getAllowedList(@RequestParam String username) {
        return userManagementService.getAllowedList(username);
    }

    @GetMapping(path = "/getTree")
    public String getTree(@RequestParam String username) {
        return userManagementService.getTree(username);
    }

    @PatchMapping(path = "/compute")
    public String leastTries(
            @RequestParam String username, @RequestParam int width,
            @RequestBody DoubleWordArray guestLists) {
        if (username.equals("")) {
            return guestManagementService.leastTries(guestLists, width);
        }
        return userManagementService.leastTries(username, width);
    }

}
