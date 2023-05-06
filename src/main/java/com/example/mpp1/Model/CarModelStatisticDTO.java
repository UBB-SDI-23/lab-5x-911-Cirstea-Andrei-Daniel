package com.example.mpp1.Model;

import lombok.Getter;
import lombok.Setter;

public class CarModelStatisticDTO {
    public CarModelStatisticDTO(Long id, String model, String manufacturer, Long price, Long manufacture_year, Long fuel_consumption, Integer unitCount) {
        this.id = id;
        this.model = model;
        this.manufacturer = manufacturer;
        this.price = price;
        this.manufacture_year = manufacture_year;
        this.fuel_consumption = fuel_consumption;
        this.unitCount = unitCount;
    }

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
    private Integer unitCount;

}
