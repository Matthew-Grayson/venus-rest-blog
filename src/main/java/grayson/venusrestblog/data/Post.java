package grayson.venusrestblog.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.web.bind.annotation.RestController;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
@RestController
@Entity @Table(name = "posts")
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @Column(nullable = false, length = 1024)
    private String content;

    @ManyToOne @JsonIgnoreProperties({"posts", "password"})
    private User author;

    @Transient
    private Collection<Category> categories;
}
