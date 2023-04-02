package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

public class PurchaseDTO {
    @Getter
    @Setter
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

    @Getter
    @Setter
    private Long customerID;

}
