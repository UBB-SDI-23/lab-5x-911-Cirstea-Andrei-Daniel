package com.example.mpp1.Model;

import lombok.Getter;
import lombok.Setter;

public class CarModelStatisticDTO {

    @Getter
    @Setter
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
    private Integer purchaseCount;

}
