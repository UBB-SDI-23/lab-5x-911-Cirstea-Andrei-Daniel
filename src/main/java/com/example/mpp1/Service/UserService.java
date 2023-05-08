package com.example.mpp1.Service;


import com.example.mpp1.Jwt.JwtRequest;
import com.example.mpp1.Jwt.UserAuthenticationProvider;
import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.UserProfileRepository;
import com.example.mpp1.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUsers() {
        return user_repository.findAll();
    }

    public User enableUser(Long userID) throws Exception {
        Optional<User> value = user_repository.findById(userID);
        if (!value.isPresent()) {
            throw new Exception("Invalid user id when trying to enable");
        }

        User user = value.get();
        user.setIsEnabled(true);
        return user_repository.save(user);
    }

    public User login(JwtRequest request) throws Exception {
        User user = user_repository.findByUsername(request.getUsername());

        if (user == null) {
            throw new Exception("The username " + request.getUsername() + " doesn't exist");
        }

        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return user;
        }
        throw new Exception("Invalid password for username " + request.getUsername());
    }

    public User register(User user) throws Exception {
        User existing_user = user_repository.findByUsername(user.getUsername());

        if (existing_user != null) {
            throw new Exception("The username " + user.getUsername() + " already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserProfile profile = new UserProfile();
        profile.setUser(user);
        user = user_repository.save(user);
        user_profile_repository.save(profile);
        return user;
    }

    public User findID(Long userID){
        return user_repository.findById(userID).get();
    }

    public UserProfileDTO findUserProfile(Long userID) {
        UserProfile user_profile = user_profile_repository.findByUserId(userID);
        return convertToDto(user_profile);
    }

    public String deleteUser(Long userID){
        User user = user_repository.findById(userID).get();
        user_profile_repository.deleteByUser(user);
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

}
