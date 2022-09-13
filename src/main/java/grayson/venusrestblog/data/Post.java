package grayson.venusrestblog.data;

import lombok.*;
import org.springframework.web.bind.annotation.RestController;
@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
@RestController
public class Post {
    private Long id;
    private String title;
    private String content;
    private User author;
}
