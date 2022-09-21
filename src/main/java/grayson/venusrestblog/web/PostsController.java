package grayson.venusrestblog.web;

import grayson.venusrestblog.data.*;
import grayson.venusrestblog.services.EmailService;
import grayson.venusrestblog.utils.FieldHelper;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/{id}")
    public Optional<Post> fetchPostById(@PathVariable long id) {
        Optional<Post> optionalPost = postsRepository.findById(id);
        if(optionalPost.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        return optionalPost;
    }
    @PostMapping("")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createPost(@RequestBody Post newPost, OAuth2Authentication auth) {
        if(newPost.getTitle() == null || newPost.getTitle().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title cannot be blank.");
        }
        if(newPost.getContent() == null || newPost.getContent().length() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Content cannot be blank.");
        }
        User author = usersRepository.findByUsername(auth.getName());
        newPost.setAuthor(author);
        postsRepository.save(newPost);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void deletePost(@PathVariable long id, OAuth2Authentication auth) {
        Optional<Post> optional = postsRepository.findById(id);
        if(optional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        Post ogPost = optional.get();
        User currentUser = usersRepository.findByUsername(auth.getName());
        if(currentUser.getRole() != Role.ADMIN && ogPost.getAuthor().getId() != currentUser.getId()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You cannot delete another user's post.");
        }
        postsRepository.deleteById(id);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updatePost(@RequestBody Post update, @PathVariable long id, OAuth2Authentication auth) {
        Optional<Post> optional = postsRepository.findById(id);
        if(optional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post id " + id + " not found");
        }
        Post ogPost = optional.get();
        User currentUser = usersRepository.findByUsername(auth.getName());
        if(currentUser.getRole() != Role.ADMIN && ogPost.getAuthor().getId() != currentUser.getId()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You cannot edit another user's post.");
        }
//        update.setId(id);
        BeanUtils.copyProperties(update, ogPost, FieldHelper.getNullPropertyNames(update));
        postsRepository.save(ogPost);
    }
}
