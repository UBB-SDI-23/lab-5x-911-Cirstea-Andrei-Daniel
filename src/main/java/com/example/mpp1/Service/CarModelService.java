package com.example.mpp1.Service;

import com.example.mpp1.Jwt.JwtAuthFilter;
import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.CarModelRepository;
import com.example.mpp1.Repository.CustomerRepository;
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

//@Service
//public class CarModelService {
//    @Autowired
//    private CarModelRepository repository;
//
//    private ModelMapper modelMapper = new ModelMapper();
//
//    @Autowired
//    private UserService user_service;
//
//    public List<CarModelDTO> getAll() {
//        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
//    }
//
//    public Page<CarModelDTO> getPage(Pageable page) {
//        return repository.findAllByOrderById(page).map(this::convertToDto);
//    }
//
//    public CarModel createCarModel(CarModel carModel) throws Exception {
//        CarModelValidator.Validate(carModel);
//        return repository.save(carModel);
//    }
//
//    public List<CarModel> createCarModels(List<CarModel> carModels) {
//        carModels = carModels.stream().filter(carModel -> {
//            try {
//                CarModelValidator.Validate(carModel);
//                return true;
//            }
//            catch (Exception exception) {
//                return false;
//            }
//        }).toList();
//
//        return repository.saveAll(carModels);
//    }
//
//    public CarModel findID(Long carID) throws Exception {
//        return repository.findById(carID).orElseThrow(() -> new Exception("The car model with id" + carID + "doesn't exist"));
//    }
//
//    public Integer findCountForUser(Long userID) {
//        return repository.countByUserId(userID);
//    }
//
//    public CarModel ValidateUserRole(Long elementID) throws Exception {
//        // Check to see if the request user is the same as the session one
//        CarModel element = findID(elementID);
//        if (element == null) {
//            throw new Exception("Car Model with id " + elementID + " doesn't exist");
//        }
//        user_service.ValidateUser(element, "ROLE_REGULAR");
//        return element;
//    }
//
//    public CarModel updateCarModel(CarModel carModel, Long carID) throws Exception {
//        CarModel old_carModel = ValidateUserRole(carID);
//        old_carModel = carModel;
//        return repository.save(old_carModel);
//    }
//
//    public String deleteCarModel(Long carID) throws Exception {
//        ValidateUserRole(carID);
//        repository.deleteById(carID);
//        return "Car Model successfully deleted";
//    }
//
//    private CarModelDTO convertToDto(CarModel element) {
//        CarModelDTO dto = modelMapper.map(element, CarModelDTO.class);
//        dto.setPurchaseCount(element.getCarsOnPurchaseList().size());
//        return dto;
//    }
//
//}

@Service
public class CarModelService extends ServiceBase<CarModelDTO, CarModel> {

    private final CarModelRepository repository;

    @Autowired
    public CarModelService(CarModelRepository repository, UserService user_service) {
        super(repository, "Car Model", user_service);
        this.repository = repository;
    }

    public Page<CarModel> filter(String filter_string) {
        String[] parts = filter_string.split(" ");
        Pageable page_request = PageRequest.of(0, 20);
        if (parts.length == 1) {
            return repository.findByModelContainingIgnoreCaseOrManufacturerContainsIgnoreCase(parts[0], "", page_request);
        }
        else {
            return repository.findByModelContainingIgnoreCaseOrManufacturerContainsIgnoreCase(parts[0], parts[1], page_request);
        }
    }

}

