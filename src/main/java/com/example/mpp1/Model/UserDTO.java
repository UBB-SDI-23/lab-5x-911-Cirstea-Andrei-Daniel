package com.example.mpp1.Model;

import lombok.*;

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

}
