package wordle_madness.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wordle_madness.backend.algo.*;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class UserManagementService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConcurrentHashMap<String, ReentrantLock> userLocks;

    public void addWords(String username, WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addWords(words.getWords());
        userRepository.save(currentUser);
    }

    public void addAllowedWords(String username, WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.addAllowedWords(words.getWords());
        userRepository.save(currentUser);
    }

    public void deleteWords(String username, WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteWords(words.getWords());
        userRepository.save(currentUser);
    }

    public void deleteAllowedWords(String username, WordArray words) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.deleteAllowedWords(words.getWords());
        userRepository.save(currentUser);
    }

    public void setListsToSame(String username) {
        User currentUser = userRepository.findUserByName(username);
        currentUser.setListsToSame();
        userRepository.save(currentUser);
    }

    public String conditionalLogin(String name, String password) {
        userLocks.putIfAbsent(name, new ReentrantLock());
        ReentrantLock userLock = userLocks.get(name);
        userLock.lock();
        try {
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
        } finally {
            userLock.unlock();
        }
    }

    public String logOut(String name) {
        userLocks.putIfAbsent(name, new ReentrantLock());
        ReentrantLock userLock = userLocks.get(name);
        userLock.lock();
        try {
            User currentUser = userRepository.findUserByName(name);
            if (currentUser == null) {
                return String.format("User %s does not exist", name);
            }
            currentUser.logOut();
            userRepository.save(currentUser);
            return "Logged out";
        } finally {
            userLocks.remove(name);
            userLock.unlock();
        }
    }

    public String cachedLogIn(String name) {
        userLocks.putIfAbsent(name, new ReentrantLock());
        ReentrantLock userLock = userLocks.get(name);
        userLock.lock();
        try {
            User currentUser = userRepository.findUserByName(name);
            if (currentUser == null) {
                return String.format("User %s does not exist", name);
            }
            if (currentUser.isLoggedIn()) {
                return "This user is already logged in. Please check that you have logged out of all other sessions";
            }
            currentUser.logIn();
            userRepository.save(currentUser);
            return "Logged in";
        } finally {
            userLock.unlock();
        }
    }

    public String registerUser(String name, String password, DoubleWordArray initialWords) {
        userLocks.putIfAbsent(name, new ReentrantLock());
        ReentrantLock userLock = userLocks.get(name);
        userLock.lock();
        try {
            if (userRepository.existsUserByName(name)) {
                return "User already exists";
            } else {
                User newUser = new User(name, password);
                newUser.addWords(initialWords.getWordList());
                newUser.addAllowedWords(initialWords.getAllowedList());
                userRepository.save(newUser);
                return "Registered";
            }
        } finally {
            userLock.unlock();
        }
    }

    public ArrayList<String> getWordList(String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getWordList();
    }

    public ArrayList<String> getAllowedList(String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getAllowedList();
    }

    public String getTree(String username) {
        User currentUser = userRepository.findUserByName(username);
        return currentUser.getTree();
    }

    public String leastTries(String username, int width) {
            CompletableFuture<String> futureTreeString = CompletableFuture.supplyAsync(() -> {
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
                    return "Error occurred when processing list!";
                }
            });
            return futureTreeString.completeOnTimeout(
                    "Computing of tree took too long! Please make sure your words have been entered correctly",
                    5,
                    TimeUnit.MINUTES).join();
    }
}
