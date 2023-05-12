package com.example.mpp1.Controller;

import com.example.mpp1.Jwt.JwtMessage;
import com.example.mpp1.Jwt.JwtRequest;
import com.example.mpp1.Jwt.UserAuthenticationProvider;
import com.example.mpp1.Model.*;
import com.example.mpp1.Service.*;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    private ConfirmationCodeService confirmationService;

    @Autowired
    private CarModelService carModelService;

    @Autowired
    private CarsOnPurchaseService carsOnPurchaseService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private DistributorService distributorService;

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping("/users")
    public List<User> getAll() {
        return service.getUsers();
    }

    @GetMapping("/users/find/{id}")
    public User findID(@PathVariable("id") Long userID){
        return service.findID(userID);
    }

    @GetMapping("/users/find_profile/{id}")
    public UserProfileDTO findUserProfile(@PathVariable("id") Long userID) {
        return convertToProfileDto(service.findUserProfile(userID));
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable("id") Long userID){
        return service.deleteUser(userID);
    }

    @PostMapping("/users/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest request) {
        try {
            System.out.println("Login entered " + request.toString());

            User user = service.login(request);
            return ResponseEntity.ok(convertToDTO(user));
        }
        catch (Exception exception)  {
            System.out.println(exception.toString());
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/users/register")
    public ResponseEntity<?> directRegister(@RequestBody User user) {
        try {
            System.out.println("Register entered " + user.toString());

            User createdUser = service.register(user);
            return ResponseEntity.ok(convertToDTO(createdUser));
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.toString());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> generateConfirmationCode(@RequestBody User user) {
        try {
            return ResponseEntity.ok(new JwtMessage(confirmationService.generateConfirmationCode(user).getValue()));
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/register/confirm/{code}")
    public ResponseEntity<?> confirmCode(@PathVariable("code") String code) {
        try {
            User user = confirmationService.validateConfirmationCode(code);
            return ResponseEntity.ok(convertToDTO(user));
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setToken(userAuthenticationProvider.createToken(user.getUsername()));
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        return dto;
    }

    private UserProfileDTO convertToProfileDto(UserProfile element) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(element.getId());
        dto.setBirthday(element.getBirthday());
        dto.setDescription(element.getDescription());
        dto.setLocation(element.getLocation());
        dto.setGender(element.getGender());
        dto.setPhone_number(element.getPhone_number());

        List<Integer> entity_count = new ArrayList<>();
        User user = element.getUser();
        Long user_id = user.getId();
        entity_count.add(carModelService.findCountForUser(user_id));
        entity_count.add(customerService.findCountForUser(user_id));
        entity_count.add(distributorService.findCountForUser(user_id));
        entity_count.add(purchaseService.findCountForUser(user_id));
        entity_count.add(shipmentService.findCountForUser(user_id));
        entity_count.add(carsOnPurchaseService.findCountForUser(user_id));
        dto.setEntity_count(entity_count);
        return dto;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

}
