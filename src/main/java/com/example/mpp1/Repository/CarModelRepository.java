package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModelStatisticDTO;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mpp1.Model.CarModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

    @Query(value = "SELECT cm.id, cm.model, cm.manufacturer, cm.price, cm.manufacture_year, cm.fuel_consumption, COUNT(cop.id) as purchaseCount " +
            "FROM car_model cm LEFT JOIN cars_on_purchase cop ON cm.id = cop.car_model_id ",
            nativeQuery = true)
    List<CarModelStatisticDTO> getCarModelsWithPurchaseCount();

    @SqlResultSetMapping(
            name = "CarModelStatisticDTOMapping",
            classes = @ConstructorResult(
                    targetClass = CarModelStatisticDTO.class,
                    columns = {
                            @ColumnResult(name = "id", type = Long.class),
                            @ColumnResult(name = "model", type = String.class),
                            @ColumnResult(name = "manufacturer", type = String.class),
                            @ColumnResult(name = "price", type = Long.class),
                            @ColumnResult(name = "manufacture_year", type = Long.class),
                            @ColumnResult(name = "fuel_consumption", type = Long.class),
                            @ColumnResult(name = "purchaseCount", type = Integer.class)
                    }
            )
    )
    static interface CarModelStatisticDTOProjection {}

}
