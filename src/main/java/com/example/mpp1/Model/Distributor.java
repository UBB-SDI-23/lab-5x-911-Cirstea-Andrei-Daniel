package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.Date;
import java.util.List;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Distributor implements IModel<DistributorDTO> {
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

    @ManyToOne
    @JoinColumn(name = "userID_FK")
    private User user;

    public void Validate() throws Exception {
        DistributorValidator.Validate(this);
    }

    public DistributorDTO toDTO() {
        ModelMapper modelMapper = new ModelMapper();
        DistributorDTO dto = modelMapper.map(this, DistributorDTO.class);
        dto.setShipmentCount(getShipments().size());
        return dto;
    }

}
