package com.example.mpp1.Jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class JwtRequest {

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String password;

    public String toString() {
        return "Username: " + username + "; Password: " + password;
    }

}
