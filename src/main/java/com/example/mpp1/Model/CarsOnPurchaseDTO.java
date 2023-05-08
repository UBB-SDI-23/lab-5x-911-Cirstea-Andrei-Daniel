package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

public class CarsOnPurchaseDTO {
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private Integer count;

    @Getter
    @Setter
    private Integer priority;

    @Getter
    @Setter
    private User user;

}
