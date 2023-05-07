package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(indexes = {
        @Index(name = "idx_carsonpurchase_purchase", columnList = "purchaseID_FK"),
        @Index(name = "idx_carsonpurchase_car_model", columnList = "carModelID_FK")
})
public class CarsOnPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "carsOnPurchaseID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "carModelID_FK")
    @JsonIgnoreProperties("carsOnPurchaseList")
    private CarModel carModel;

    @ManyToOne
    @JoinColumn(name = "purchaseID_FK")
    @JsonIgnoreProperties("carsOnPurchaseList")
    private Purchase purchase;

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

    @Getter
    @Setter
    private Integer count;

    @Getter
    @Setter
    private Integer priority;

}
