package grayson.venusrestblog.web;

import grayson.venusrestblog.data.Post;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {
    private ArrayList<Post> posts = new ArrayList<>();
    private long nextId = 1;
    @GetMapping("/")
    public ArrayList<Post> getAll() {
        return posts;
    }
    @GetMapping("/{id}")
    private Post getById(@PathVariable long id) {
        for(Post post: posts) {
            if(post.getId() == id) {
                return post;
            }
        }
        throw new RuntimeException("Error 404");
    }
    @PostMapping("/")
    private void createPost(@RequestBody Post newPost) {
        newPost.setId(nextId++);
        posts.add(newPost);
    }


    @DeleteMapping("/{id}")
    private void deletePost(@PathVariable long id) {
        posts.removeIf(post -> Objects.equals(post.getId(), id));
    }

    @PatchMapping("/{id}")
    public void updatePost(@RequestBody Post update, @PathVariable long id) {
        for(Post post: posts) {
            if(post == null) {
                System.out.println("Post not found.");
            }
            if(Objects.equals(post.getId(), id)) {
                post.setTitle(update.getTitle());
                post.setContent(update.getContent());
            }
        }
    }
}
