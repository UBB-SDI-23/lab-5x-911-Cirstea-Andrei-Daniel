package com.example.mpp1.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mpp1.Model.CarModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

    //@Query("SELECT u FROM CarModel u OFFSET 10 LIMIT 10.")
    //List<CarModel> getPaginated()

}
