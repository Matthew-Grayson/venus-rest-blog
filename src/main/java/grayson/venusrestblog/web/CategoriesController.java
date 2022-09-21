package grayson.venusrestblog.web;

import grayson.venusrestblog.data.CategoriesRepository;
import grayson.venusrestblog.data.Category;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/categories", headers = "application/json")
public class CategoriesController {
    private final CategoriesRepository categoriesRepository;


    @GetMapping("")
    public List<Category> getAll() {
        return categoriesRepository.findAll();
    }

    private Category getPostsByCategory(@RequestParam String categoryName) {
        return new Category();
    }

    @GetMapping("/search")
    private Category getCategoryByName(@RequestParam String categoryName) {
        Category cat = categoriesRepository.findByName(categoryName);
        if(cat == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category " + categoryName + " not found");
        }
        return cat;
    }
}

