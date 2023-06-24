package wordle_madness.backend;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Integer> {

    public boolean existsUserByName(String name);
    public boolean existsUserByNameAndPassword(String name, String password);
}
