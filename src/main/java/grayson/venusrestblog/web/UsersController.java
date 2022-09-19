package grayson.venusrestblog.web;
import grayson.venusrestblog.data.User;
import grayson.venusrestblog.data.UsersRepository;
import grayson.venusrestblog.web.dto.UpdateUserDto;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {
    private final UsersRepository usersRepository;
    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    @GetMapping("")
    public List<User> getAll() {
        return usersRepository.findAll();
    }
    @GetMapping("/{id}")
    private Optional<User> getById(@PathVariable long id) {
        return usersRepository.findById(id);
    }
    @PostMapping("")
    private void createUser(@RequestBody User newUser) {
        newUser.setCreatedAt(LocalDate.now());
        usersRepository.save(newUser);
    }
    @DeleteMapping("/{id}")
    private void deleteUser(@PathVariable long id) {
        usersRepository.deleteById(id);
    }
    @PatchMapping("/{id}")
    public void updateUser(@RequestBody User update, @PathVariable long id) {
        update.setId(id);
        usersRepository.save(update);
    }
    @PutMapping
    public void update(@RequestBody UpdateUserDto updateUserDto){
        System.out.println(updateUserDto);
    }
//    @PatchMapping("/${id}/updatePassword")
//    public void updatePassword()
}
