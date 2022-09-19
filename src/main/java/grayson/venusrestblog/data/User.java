package grayson.venusrestblog.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Collection;

@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 100, unique = true)
    private String username;

    @Email @NotEmpty @Column(nullable = false, length = 100, unique = true)
    private String email;

    @ToStringExclude @Column(nullable = false, length = 100)
    private String password;

    @NotNull
    private LocalDate createdAt;

    @NotNull @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "author") @JsonIgnoreProperties("author")
    @ToString.Exclude
    private Collection<Post> posts;
}
