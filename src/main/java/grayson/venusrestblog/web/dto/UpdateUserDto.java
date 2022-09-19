package grayson.venusrestblog.web.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@ToString
public class UpdateUserDto{
    private long id;
    private String username;
    private String email;

}
