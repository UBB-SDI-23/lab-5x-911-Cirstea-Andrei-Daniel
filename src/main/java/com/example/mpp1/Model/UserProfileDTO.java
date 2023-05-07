package com.example.mpp1.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

public class UserProfileDTO {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private String location;

    @Getter
    @Setter
    private Date birthday;

    @Getter
    @Setter
    private String gender;

    @Getter
    @Setter
    private String phone_number;

    @Getter
    @Setter
    private List<Integer> entity_count;

}
