package com.example.mpp1.Model;

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
public class Purchase {
    @Id
    @GeneratedValue()
    @Column(name = "purchaseID_PK")
    private Long id;

    @Getter
    @Setter
    private Date date;

    @Getter
    @Setter
    private String payMethod;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private Long customerID;

    @ManyToOne
    @JoinColumn(name = "customerID_FK")
    @JsonIgnoreProperties("purchases")
    private Customer original_customer;

    @OneToMany(mappedBy = "purchase")
    @JsonIgnoreProperties("purchase")
    private List<CarsOnPurchase> carsOnPurchaseList;

    public String toString() {
        return "Purchase id " + id + " date " + date + " payMethod " + payMethod + " status " + status + " customerID " + customerID;
    }

}