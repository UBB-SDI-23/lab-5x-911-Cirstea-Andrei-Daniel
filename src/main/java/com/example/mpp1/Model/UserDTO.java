package com.example.mpp1.Model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String token;

    @Getter
    @Setter
    private List<UserRole> roles;

}
