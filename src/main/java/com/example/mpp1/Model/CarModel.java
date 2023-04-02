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
public class CarModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "carID")
    private Long id;

    @Getter
    @Setter
    private String model;

    @Getter
    @Setter
    private String manufacturer;

    @Getter
    @Setter
    private Long price;

    @Getter
    @Setter
    private Long manufacture_year;

    @Getter
    @Setter
    private Long fuel_consumption;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "carModel", orphanRemoval = true)
    @JsonIgnoreProperties("carModel")
    private List<CarsOnPurchase> carsOnPurchaseList;
}
