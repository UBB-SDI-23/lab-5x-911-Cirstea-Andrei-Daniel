package com.example.mpp1.Controller;

import com.example.mpp1.Jwt.JwtRequest;
import com.example.mpp1.Jwt.UserAuthenticationProvider;
import com.example.mpp1.Model.*;
import com.example.mpp1.Service.UserService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:5173")
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private UserAuthenticationProvider userAuthenticationProvider;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest request) {
        try {
            User user = service.login(request);
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setToken(userAuthenticationProvider.createToken(user.getUsername()));
            return ResponseEntity.ok(dto);
        }
        catch (Exception exception)  {
            return ResponseEntity.badRequest().body(exception.toString());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User createdUser = service.register(user);
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setToken(userAuthenticationProvider.createToken(user.getUsername()));
            return ResponseEntity.ok(dto);
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.toString());
        }
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
