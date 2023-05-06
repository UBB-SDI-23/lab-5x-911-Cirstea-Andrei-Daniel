package com.example.mpp1.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
public class DistributorStatisticDTO {

    @Getter
    @Setter
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

    @Getter
    @Setter
    private Integer averageShipmentPrice;
}
