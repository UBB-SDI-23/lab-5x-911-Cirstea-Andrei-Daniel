package com.example.mpp1.Model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class PurchaseStatisticDTO {
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

    @Getter
    @Setter
    private Integer carsPurchased;

    @Getter
    @Setter
    private User user;

}
