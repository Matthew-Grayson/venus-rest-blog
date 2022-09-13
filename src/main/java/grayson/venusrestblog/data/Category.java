package grayson.venusrestblog.data;
import lombok.*;

import java.util.List;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class Category {
    private Long id;
    private String name;
    private List<Post> relatedPosts;
}
