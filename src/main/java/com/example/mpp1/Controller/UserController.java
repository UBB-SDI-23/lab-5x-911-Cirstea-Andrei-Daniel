package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Service.CarModelService;
import com.example.mpp1.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping()
    public ResponseEntity<?> createUser(@RequestBody User user) {
        return service.createUser(user);
    }

//    @PostMapping("/create")
//    public List<CarModel> createCarModels(@RequestBody List<CarModel> carModels) {
//        return service.createCarModels(carModels);
//    }

    @GetMapping("/find/{id}")
    public User findID(@PathVariable("id") Long userID){
        return service.findID(userID);
    }

    @GetMapping("/find_profile/{id}")
    public UserProfileDTO findUserProfile(@PathVariable("id") Long userID) {
        return service.findUserProfile(userID);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long userID){
        return service.deleteUser(userID);
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
