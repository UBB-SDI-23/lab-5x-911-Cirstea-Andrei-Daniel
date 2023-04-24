package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.DatabindException;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(indexes = {
        @Index(name = "idx_shipment_distributor", columnList = "distributorID_FK")
})
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "shipmentID")
    private Long id;

    @Getter
    @Setter
    private Date expectedArrival;

    @Getter
    @Setter
    private Date arrival;

    @Getter
    @Setter
    private Integer totalPrice;

    @ManyToOne
    @JoinColumn(name="distributorID_FK")
    @JsonIgnoreProperties("shipments")
    private Distributor parent_distributor;

}
