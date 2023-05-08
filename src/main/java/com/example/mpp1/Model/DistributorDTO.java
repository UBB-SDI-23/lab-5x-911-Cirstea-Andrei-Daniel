package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

public class DistributorDTO {
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
    private Integer shipmentCount;

    @Getter
    @Setter
    private User user;

}
