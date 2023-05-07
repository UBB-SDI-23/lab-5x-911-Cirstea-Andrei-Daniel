package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "userProfileID")
    private Long id;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private String location;

    @Getter
    @Setter
    private Date birthday;

    @Getter
    @Setter
    private String gender;

    @Getter
    @Setter
    private String phone_number;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    @JsonIgnoreProperties("userProfile")
    private User user;

}
