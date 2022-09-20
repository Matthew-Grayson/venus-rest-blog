package grayson.venusrestblog.security;

import grayson.venusrestblog.data.User;
import grayson.venusrestblog.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.glassfish.jaxb.core.v2.TODO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
//TODO check usersRepo to possibly change method

    private final UsersRepository usersRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usersRepository.findByUsername(username);
        if(user == null) {
            throw new RuntimeException("User not found: " + username);
        }
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), Arrays.asList(authority));
    }
}
