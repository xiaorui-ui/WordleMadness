package wordle_madness.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@SpringBootApplication
public class BackendApplication {

	@Bean
	public ConcurrentHashMap<String, ReentrantLock> userLocks() {
		ConcurrentHashMap<String, ReentrantLock> hashMap = new ConcurrentHashMap<>();
		return hashMap;
	}

	public static void main(String[] args) {
		System.out.println("Processing power: " + Runtime.getRuntime().availableProcessors());
		SpringApplication.run(BackendApplication.class, args);
	}

}
