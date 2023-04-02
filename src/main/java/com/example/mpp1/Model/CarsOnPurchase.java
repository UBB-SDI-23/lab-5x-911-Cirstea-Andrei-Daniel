package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
@Data
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

    @Getter
    @Setter
    private Integer count;

    @Getter
    @Setter
    private Integer priority;

}
