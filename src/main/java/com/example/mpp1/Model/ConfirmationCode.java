package com.example.mpp1.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationCode {

    @Id
    @Getter
    @Setter
    private String value;

    @Getter
    @Setter
    private Date creationDate;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    @Getter
    @Setter
    private User user;

}
