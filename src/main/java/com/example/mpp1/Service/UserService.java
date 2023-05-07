package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.ConfirmationCodeRepository;
import com.example.mpp1.Repository.UserProfileRepository;
import com.example.mpp1.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository user_repository;

    @Autowired
    private UserProfileRepository user_profile_repository;

    @Autowired
    private CarModelService car_model_service;

    @Autowired
    private CarsOnPurchaseService cars_on_purchase_service;

    @Autowired
    private CustomerService customer_service;

    @Autowired
    private DistributorService distributor_service;

    @Autowired
    private PurchaseService purchase_service;

    @Autowired
    private ShipmentService shipment_service;

    private ModelMapper modelMapper = new ModelMapper();

    public ResponseEntity<?> createUser(User user) {
        if (UserValidator.Validate(user)) {
            return new ResponseEntity<>("Invalid user password", HttpStatus.BAD_REQUEST);
        }

        UserProfile default_profile = new UserProfile();
        default_profile.setUser(user);
        user.setUserProfile(default_profile);
        user = user_repository.save(user);
        user_profile_repository.save(default_profile);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

//    public List<CarModel> createCarModels(List<CarModel> carModels) {
//        carModels = carModels.stream().filter(carModel -> {
//            if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
//                    || carModel.getManufacturer().equals("")) {
//                return false;
//            }
//            return true;
//        }).toList();
//
//        return repository.saveAll(carModels);
//    }

    public User findID(Long userID){
        return user_repository.findById(userID).get();
    }

    public UserProfileDTO findUserProfile(Long userID) {
        UserProfile user_profile = user_profile_repository.findByUserId(userID);
        return convertToDto(user_profile);
    }

//    public CarModel updateCarModel(CarModel carModel, Long carID){
//        CarModel old_carModel = findID(carID);
//        old_carModel = carModel;
//        return repository.save(old_carModel);
//    }

    public String deleteUser(Long userID){
        User user = user_repository.findById(userID).get();
        user_profile_repository.deleteById(user.getUserProfile().getId());
        user_repository.deleteById(userID);
        return "User successfully deleted";
    }

    private UserProfileDTO convertToDto(UserProfile element) {
        UserProfileDTO dto = modelMapper.map(element, UserProfileDTO.class);
        List<Integer> entity_count = dto.getEntity_count();
        User user = element.getUser();
        Long user_id = user.getId();
        entity_count.add(car_model_service.findCountForUser(user_id));
        entity_count.add(customer_service.findCountForUser(user_id));
        entity_count.add(distributor_service.findCountForUser(user_id));
        entity_count.add(purchase_service.findCountForUser(user_id));
        entity_count.add(shipment_service.findCountForUser(user_id));
        entity_count.add(cars_on_purchase_service.findCountForUser(user_id));
        return dto;
    }
//
//    private CarModelStatisticDTO convertToStatisticDto(CarModel element) {
//        CarModelStatisticDTO dto = modelMapper.map(element, CarModelStatisticDTO.class);
//        dto.setUnitCount(element.getCarsOnPurchaseList().stream().mapToInt(value -> value.getCount()).sum());
//        return dto;
//    }

}
