package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class CarModelDTO {
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

}
