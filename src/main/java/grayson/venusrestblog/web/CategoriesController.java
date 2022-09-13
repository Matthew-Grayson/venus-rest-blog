package grayson.venusrestblog.web;

import grayson.venusrestblog.data.Category;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {

    private Category getPostsByCategory(@RequestParam String categoryName) {
        return new Category();
    }
}
