package grayson.venusrestblog.web;

import grayson.venusrestblog.data.*;
import grayson.venusrestblog.services.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value="/api/users", produces="application/json")
public class UsersController {
    private final PostsRepository postsRepository;
    private final UsersRepository usersRepository;
    private final CategoriesRepository categoriesRepository;
    private final EmailService emailService;
    private PasswordEncoder passwordEncoder;

    @GetMapping("")
    public List<User> getAll() {
        return usersRepository.findAll();
    }

    @GetMapping("/me")
    public Optional<User> getMe(OAuth2Authentication auth) {
        if(auth ==  null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Please login");
        }

        System.out.println(auth.getName());
        User user = usersRepository.findByUsername(auth.getName());
        return Optional.of(user);
    }

    @GetMapping("/{id}")
    private Optional<User> getById(@PathVariable long id) {
        return usersRepository.findById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("!hasAuthority('USER')")
    public void createUser(@RequestBody User newUser) {
        newUser.setRole(Role.USER);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
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
    //    @PutMapping
//    public void update(@RequestBody UpdateUserDto updateUserDto){
//        System.out.println(updateUserDto);
    @PutMapping("/{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @RequestParam String newPassword) {
        Optional<User> optionalUser = usersRepository.findById(id);
        if(optionalUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + id + " not found");
        }

        User user = optionalUser.get();

        // compare old password with saved pw
        if(!user.getPassword().equals(oldPassword)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "amscray");
        }

        // validate new password
        if(newPassword.length() < 14) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords must be at least 14 characters.");
        }

        user.setPassword(newPassword);
        usersRepository.save(user);
    }
}
