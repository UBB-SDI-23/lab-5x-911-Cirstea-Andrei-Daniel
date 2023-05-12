package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "user_table", indexes = @Index(columnList = "username"))
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "userID")
    private Long id;

    @Column(unique = true)
    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private Boolean enabled;

    @ManyToOne
    private UserRole role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> arrayList = new ArrayList<>();
        arrayList.add(new SimpleGrantedAuthority(role.getName()));
        return arrayList;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String toString() {
        return "Id: " +  id + ", Username: " + username + ", Password: " + password + ", enabled: " + enabled + ", Email: " + email + ", Roles: " + role.getName();
    }

    public User deepCopy() {
        return new User(getId(), new String(getUsername()), new String(getEmail()), new String(getPassword()), enabled, new UserRole(role.getId(), role.getName()));
    }

}
