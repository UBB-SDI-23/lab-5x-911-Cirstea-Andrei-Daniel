package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.DatabindException;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(indexes = {
        @Index(name = "idx_shipment_distributor", columnList = "distributorID_FK")
})
public class Shipment implements IModel<ShipmentDTO> {
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

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

    public void Validate() throws Exception {
        ShipmentValidator.Validate(this);
    }

    public ShipmentDTO toDTO() {
        ModelMapper modelMapper = new ModelMapper();
        ShipmentDTO dto = modelMapper.map(this, ShipmentDTO.class);
        dto.setDistributorID(getParent_distributor().getId());
        return dto;
    }

}
