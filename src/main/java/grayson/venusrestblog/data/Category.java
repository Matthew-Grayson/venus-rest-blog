package grayson.venusrestblog.data;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "category_name", nullable = false, length = 100)
    private String name;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;
    @Transient
    private List<Post> relatedPosts;

}
