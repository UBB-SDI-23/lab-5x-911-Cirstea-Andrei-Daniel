package com.example.mpp1.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class ShipmentDTO {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private Long distributorID;

    @Getter
    @Setter
    private Date expectedArrival;

    @Getter
    @Setter
    private Date arrival;

    @Getter
    @Setter
    private Integer totalPrice;

}