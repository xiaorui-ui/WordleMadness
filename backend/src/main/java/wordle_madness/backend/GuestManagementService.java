package wordle_madness.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import wordle_madness.backend.algo.NestedMap;
import wordle_madness.backend.algo.WordleMemo;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
public class GuestManagementService {
    public String leastTries(Initializer wordsAndTree, int width) {
        CompletableFuture<String> futureTreeString = CompletableFuture.supplyAsync(() -> {
            List<String> allowed = List.of(wordsAndTree.getAllowedList());
            List<String> ans = List.of(wordsAndTree.getWordList());
            ObjectMapper objectMapper = new ObjectMapper();
            NestedMap<Integer, String, List<String>> tree = new WordleMemo(allowed, ans,
                    allowed.get(0).length())
                    .solveMemo(ans, width);
            try {
                String treeString = objectMapper.writeValueAsString(tree);
                return treeString;
            } catch (JsonProcessingException j) {
                return "Error occurred when processing list!";
            }
        });
        return futureTreeString.completeOnTimeout(
                "Computing of tree took too long! Please make sure your words have been entered correctly",
                1,
                TimeUnit.MINUTES).join();
    }
}
