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
    public CarModel(Long id, String model, String manufacturer, Long price, Long manufacture_year, Long fuel_consumption, String description) {
        this.id = id;
        this.model = model;
        this.manufacturer = manufacturer;
        this.price = price;
        this.manufacture_year = manufacture_year;
        this.fuel_consumption = fuel_consumption;
        this.description = description;
    }

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

    @Getter
    @Setter
    private String description;

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "carModel", orphanRemoval = true)
    @JsonIgnoreProperties("carModel")
    private List<CarsOnPurchase> carsOnPurchaseList;
}
