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
    @PostMapping(path="/add")
    public @ResponseBody String addNewUser (@RequestParam String name
            , @RequestParam String password) {
        User n = new User();
        n.setName(name);
        n.setPassword(password);
        userRepository.save(n);
        return "Saved";
    }
    @CrossOrigin(origins=FRONTEND)
    @GetMapping(path="/verify")
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
            return "Logged in";
        }
        return "Invalid login details";
    }
}