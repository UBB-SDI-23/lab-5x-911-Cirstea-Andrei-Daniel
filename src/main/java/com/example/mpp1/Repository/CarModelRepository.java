package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModelStatisticDTO;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mpp1.Model.CarModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

    @Query(value = "SELECT cm.carid as id, cm.model, cm.manufacturer, cm.price, cm.manufacture_year, cm.fuel_consumption, COUNT(cop.cars_on_purchaseid) as purchaseCount" +
            "FROM car_model cm LEFT JOIN cars_on_purchase cop ON cm.carid = cop.car_modelid_fk" +
            "GROUP BY cm.carid" +
            "ORDER BY purchaseCount DESC" +
            "LIMIT ?1 OFFSET ?2",
            nativeQuery = true)
    Page<CarModelStatisticDTO> getCarModelsWithPurchaseCount(Pageable pageable);

}
