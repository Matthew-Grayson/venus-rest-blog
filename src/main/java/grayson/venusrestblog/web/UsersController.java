package grayson.venusrestblog.web;
import grayson.venusrestblog.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private List<User> users = new ArrayList<>();
    private long nextId = 1;
    @GetMapping("")
    public List<User> getAll() {
        return users;
    }
    @GetMapping("/{id}")
    private User getById(@PathVariable long id) {
        for(User user: users) {
            if(user.getId() == id) {
                return user;
            }
        }
        throw new RuntimeException("Error 404");
    }
    @PostMapping("")
    private void createUser(@RequestBody User newUser) {
        newUser.setId(nextId++);
        users.add(newUser);
    }


    @DeleteMapping("/{id}")
    private void deleteUser(@PathVariable long id) {
        users.removeIf(user -> Objects.equals(user.getId(), id));
    }

    @PatchMapping("/{id}")
    public void updateUser(@RequestBody User update, @PathVariable long id) {
        for(User user: users) {
            if(user == null) {
                System.out.println("User not found.");
            }
            if(Objects.equals(user.getId(), id)) {
                user.setEmail(update.getEmail());
                user.setPassword(update.getPassword());
            }
        }
    }
}
