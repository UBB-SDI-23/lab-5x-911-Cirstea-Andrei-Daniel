package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "customerID")
    private Long id;

    @Getter
    @Setter
    private String firstName;

    @Getter
    @Setter
    private String lastName;

    @Getter
    @Setter
    private String telephone_number;

    @Getter
    @Setter
    private String email_address;

    @Getter
    @Setter
    private String priority;

    @OneToMany(mappedBy="original_customer")
    @JsonIgnoreProperties("original_customer")
    private List<Purchase> purchases;

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

}
