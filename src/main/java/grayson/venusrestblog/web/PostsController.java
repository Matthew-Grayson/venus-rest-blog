package grayson.venusrestblog.web;

import grayson.venusrestblog.data.*;
import grayson.venusrestblog.services.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {
    private final PostsRepository postsRepository;
    private final UsersRepository usersRepository;
    private final CategoriesRepository categoriesRepository;
    private final EmailService emailService;



    @GetMapping("")
    public List<Post> getAll() {
        return postsRepository.findAll();
    }

//    @GetMapping("/{id}")
//    private Optional<Post> getById(@PathVariable long id) {
//        return postsRepository.findById(id);
//    }
    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        Optional<Post> optionalPost = postsRepository.findById(id);
        if(optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        return optionalPost;
    }
    @PostMapping("")
    private void createPost(@RequestBody Post newPost) {
        User author = usersRepository.findById(1L).get();
        newPost.setAuthor(author);
        postsRepository.save(newPost);
    }

    @DeleteMapping("/{id}")
    private void deletePost(@PathVariable long id) {
        Optional<Post> optionalPost = postsRepository.findById(id);
        if(optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        postsRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public void updatePost(@RequestBody Post update, @PathVariable long id) {
        update.setId(id);
        postsRepository.save(update);
    }
}
