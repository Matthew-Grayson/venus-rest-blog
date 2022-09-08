package grayson.venusrestblog.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RestController;
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@RestController
public class Post {
    private Long id;
    private String title;
    private String content;
}
