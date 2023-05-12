package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarModelDTO;
import com.example.mpp1.Model.IModel;
import com.example.mpp1.Service.CarModelService;
import com.example.mpp1.Service.ServiceBase;
import jakarta.annotation.security.RolesAllowed;
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

public class ControllerBase<DTO, Model extends IModel<DTO>> {

    private final ServiceBase<DTO, Model> service;

    public ControllerBase(ServiceBase<DTO, Model> service) {
        this.service = service;
    }

    @GetMapping()
    public List<DTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/paged")
    public Page<DTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
        Pageable page_request = PageRequest.of(page, page_size);
        return service.getPage(page_request);
    }

    @PostMapping()
    @RolesAllowed({"ROLE_REGULAR", "ROLE_MODERATOR", "ROLE_ADMIN"})
    public ResponseEntity<?> createCarModel(@RequestBody Model element) {
        try {
            return new ResponseEntity<>(service.create(element), HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    @RolesAllowed({"ROLE_REGULAR", "ROLE_MODERATOR", "ROLE_ADMIN"})
    public List<Model> createCarModels(@RequestBody List<Model> elements) {
        return service.createList(elements);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findID(@PathVariable("id") Long id){
        try {
            Model element = service.findID(id);
            return new ResponseEntity<>(element, HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    @RolesAllowed({"ROLE_REGULAR", "ROLE_MODERATOR", "ROLE_ADMIN"})
    public ResponseEntity<?> updateCarModel(@RequestBody Model element, @PathVariable("id") Long id){
        try {
            element = service.update(element, id);
            return new ResponseEntity<>(element, HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCarModel(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(service.delete(id), HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

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
