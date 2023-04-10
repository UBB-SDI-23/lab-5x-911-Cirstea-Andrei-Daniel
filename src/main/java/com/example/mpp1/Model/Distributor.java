package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Distributor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "distributorID")
    private Long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private Date cooperationStartDate;

    @Getter
    @Setter
    private String country;

    @Getter
    @Setter
    private String contactEmail;

    @Getter
    @Setter
    private String category;

    @OneToMany(mappedBy="parent_distributor")
    @JsonIgnoreProperties("parent_distributor")
    private List<Shipment> shipments;

}
