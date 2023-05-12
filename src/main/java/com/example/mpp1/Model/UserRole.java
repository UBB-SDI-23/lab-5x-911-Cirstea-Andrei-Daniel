package com.example.mpp1.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "roleID")
    private Long id;

    @Column(unique = true)
    @Getter
    @Setter
    private String name;

}
