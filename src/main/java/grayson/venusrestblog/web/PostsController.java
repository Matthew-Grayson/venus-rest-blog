package grayson.venusrestblog.web;

import grayson.venusrestblog.data.CategoriesRepository;
import grayson.venusrestblog.data.Post;
import grayson.venusrestblog.data.PostsRepository;
import grayson.venusrestblog.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {
    private final PostsRepository postsRepository;
    private final UsersRepository usersRepository;
    private final CategoriesRepository categoriesRepository;


    @GetMapping("")
    public List<Post> getAll() {
        return postsRepository.findAll();
    }
    @GetMapping("/{id}")
    private Optional<Post> getById(@PathVariable long id) {
        return postsRepository.findById(id);
    }
    @PostMapping("")
    private void createPost(@RequestBody Post newPost) {
        postsRepository.save(newPost);
    }

    @DeleteMapping("/{id}")
    private void deletePost(@PathVariable long id) {
        postsRepository.deleteById(id);
    }

    @PatchMapping("/{id}")
    public void updatePost(@RequestBody Post update, @PathVariable long id) {
        update.setId(id);
        postsRepository.save(update);
    }
}
