package com.example.mpp1;

import com.example.mpp1.Controller.CarModelController;
import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Repository.CarModelRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CarModelControllerTest {

    @Mock
    private CarModelRepository repository;

    @InjectMocks
    private CarModelController controller;

    @Test
    void testGetAllSortedByPriceWhichAppearInCountPurchases() {
        CarModel car1 = new CarModel();
        car1.setId(1L);
        car1.setModel("Civic");
        car1.setManufacturer("Honda");
        car1.setPrice(25000L);
        car1.setManufacture_year(2022L);
        car1.setFuel_consumption(12L);

        CarModel car2 = new CarModel();
        car2.setId(2L);
        car2.setModel("Camry");
        car2.setManufacturer("Toyota");
        car2.setPrice(30000L);
        car2.setManufacture_year(2022L);
        car2.setFuel_consumption(14L);

        CarModel car3 = new CarModel();
        car3.setId(3L);
        car3.setModel("Accord");
        car3.setManufacturer("Honda");
        car3.setPrice(28000L);
        car3.setManufacture_year(2022L);
        car3.setFuel_consumption(13L);

        CarModel car4 = new CarModel();
        car4.setId(4L);
        car4.setModel("Corolla");
        car4.setManufacturer("Toyota");
        car4.setPrice(22000L);
        car4.setManufacture_year(2022L);
        car4.setFuel_consumption(12L);

        CarModel car5 = new CarModel();
        car5.setId(5L);
        car5.setModel("S-Class");
        car5.setManufacturer("Mercedes-Benz");
        car5.setPrice(95000L);
        car5.setManufacture_year(2022L);
        car5.setFuel_consumption(8L);

        CarModel car6 = new CarModel();
        car6.setId(6L);
        car6.setModel("3 Series");
        car6.setManufacturer("BMW");
        car6.setPrice(45000L);
        car6.setManufacture_year(2022L);
        car6.setFuel_consumption(10L);

        CarModel car7 = new CarModel();
        car7.setId(7L);
        car7.setModel("A4");
        car7.setManufacturer("Audi");
        car7.setPrice(40000L);
        car7.setManufacture_year(2022L);
        car7.setFuel_consumption(9L);

        CarModel car8 = new CarModel();
        car8.setId(8L);
        car8.setModel("F-150");
        car8.setManufacturer("Ford");
        car8.setPrice(45000L);
        car8.setManufacture_year(2022L);
        car8.setFuel_consumption(15L);

        CarModel car9 = new CarModel();
        car9.setId(9L);
        car9.setModel("Rogue");
        car9.setManufacturer("Nissan");
        car9.setPrice(28000L);
        car9.setManufacture_year(2022L);
        car9.setFuel_consumption(11L);

        CarModel car10 = new CarModel();
        car10.setId(10L);
        car10.setModel("Altima");
        car10.setManufacturer("Nissan");
        car10.setPrice(26000L);
        car10.setManufacture_year(2022L);
        car10.setFuel_consumption(10L);

        List<CarModel> car_models = new ArrayList<CarModel>();
        car_models.add(car1);
        car_models.add(car2);
        car_models.add(car3);
        car_models.add(car4);
        car_models.add(car5);
        car_models.add(car6);
        car_models.add(car7);
        car_models.add(car8);
        car_models.add(car9);
        car_models.add(car10);

        CarsOnPurchase mock_cars_on_purchase = new CarsOnPurchase();
        int count = 10;
        for (int index = 0; index < count; index++) {
            car_models.get(index).setCarsOnPurchaseList(new ArrayList<CarsOnPurchase>());
            for (int subindex = 0; subindex <= index; subindex++) {
                car_models.get(index).getCarsOnPurchaseList().add(mock_cars_on_purchase);
            }
        }

        when(repository.findAll()).thenReturn(car_models);
        for (int index = 1; index < count; index++) {
            assertThat(controller.getAllSortedByPriceWhichAppearInCountPurchases(index)).hasSize(10 - index + 1);
        }
    }

}
