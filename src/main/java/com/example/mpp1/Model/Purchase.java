package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.Date;
import java.util.List;

@Entity
@Table(indexes = {
        @Index(name = "idx_purchase_customer", columnList = "customerID_FK")
})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Purchase implements IModel<PurchaseDTO> {
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

    @ManyToOne
    @JoinColumn(name = "customerID_FK")
    @JsonIgnoreProperties("purchases")
    private Customer original_customer;

    @OneToMany(mappedBy = "purchase")
    @JsonIgnoreProperties("purchase")
    private List<CarsOnPurchase> carsOnPurchaseList;

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

    public String toString() {
        return "Purchase id " + id + " date " + date + " payMethod " + payMethod + " status " + status + " customerID " + original_customer.getId();
    }

    public void Validate() throws Exception {
        PurchaseValidator.Validate(this);
    }

    public PurchaseDTO toDTO() {
        ModelMapper modelMapper = new ModelMapper();
        PurchaseDTO dto = modelMapper.map(this, PurchaseDTO.class);
        dto.setCarsPurchased(getCarsOnPurchaseList().stream().mapToInt(CarsOnPurchase::getCount).sum());
        dto.setCustomerID(getOriginal_customer().getId());
        return dto;
    }

}