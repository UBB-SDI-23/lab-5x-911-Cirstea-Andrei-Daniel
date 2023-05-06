package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModelStatisticDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mpp1.Model.CarModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

    @Query("SELECT c.id, c.model, c.manufacturer, c.price, c.manufacture_year, c.fuel_consumption, COUNT(p) AS purchaseCount" +
            " FROM CarModel c LEFT JOIN c.carsOnPurchaseList p GROUP BY c.id")
    List<CarModelStatisticDTO> getCarModelsWithPurchaseCount();

}
