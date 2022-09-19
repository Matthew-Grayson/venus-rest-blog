package grayson.venusrestblog.web;

import grayson.venusrestblog.data.CategoriesRepository;
import grayson.venusrestblog.data.Category;
import grayson.venusrestblog.data.PostsRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {
    private final CategoriesRepository categoriesRepository;


    @GetMapping("")
    public List<Category> getAll() {
        return categoriesRepository.findAll();
    }

    private Category getPostsByCategory(@RequestParam String categoryName) {
        return new Category();
    }
}
