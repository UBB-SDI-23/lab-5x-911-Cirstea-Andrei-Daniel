package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.CarModelRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.annotation.Persistent;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//class TempClass {
//    private Long id;
//    private Long unitCount;
//}

@Service
public class CarModelService {
    @Autowired
    private CarModelRepository repository;

    private ModelMapper modelMapper = new ModelMapper();

    public List<CarModelDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<CarModelDTO> getPage(Pageable page) {
        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
        return repository.findAll(page).map(this::convertToDto);
    }

    public CarModel createCarModel(CarModel carModel) throws Exception {
        CarModelValidator.Validate(carModel);
        return repository.save(carModel);
    }

    public List<CarModel> createCarModels(List<CarModel> carModels) {
        carModels = carModels.stream().filter(carModel -> {
            try {
                CarModelValidator.Validate(carModel);
                return true;
            }
            catch (Exception exception) {
                return false;
            }
        }).toList();

        return repository.saveAll(carModels);
    }

    public CarModel findID(Long carID) throws Exception {
        return repository.findById(carID).orElseThrow(() -> new Exception("The car model with id" + carID + "doesn't exist"));
    }

    public Integer findCountForUser(Long userID) {
        return repository.countByUserId(userID);
    }

    public CarModel updateCarModel(CarModel carModel, Long carID) throws Exception {
        CarModel old_carModel = findID(carID);
        old_carModel = carModel;
        return repository.save(old_carModel);
    }

    public String deleteCarModel(Long carID) throws Exception {
        CarModel car_model = findID(carID);
        repository.deleteById(carID);
        return "Car successfully deleted";
    }

    private CarModelDTO convertToDto(CarModel element) {
        CarModelDTO dto = modelMapper.map(element, CarModelDTO.class);
        dto.setPurchaseCount(element.getCarsOnPurchaseList().size());
        return dto;
    }

    private CarModelStatisticDTO convertToStatisticDto(CarModel element) {
        CarModelStatisticDTO dto = modelMapper.map(element, CarModelStatisticDTO.class);
        dto.setUnitCount(element.getCarsOnPurchaseList().stream().mapToInt(value -> value.getCount()).sum());
        return dto;
    }

}
