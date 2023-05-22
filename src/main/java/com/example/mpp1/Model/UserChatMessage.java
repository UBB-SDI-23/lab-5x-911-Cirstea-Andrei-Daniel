package com.example.mpp1.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table
@Data
@Entity
public class UserChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "userChatID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

    private Date date;

    private String message;
}
