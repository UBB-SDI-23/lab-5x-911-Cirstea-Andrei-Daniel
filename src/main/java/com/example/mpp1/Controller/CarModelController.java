package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarModelDTO;
import com.example.mpp1.Model.CarModelStatisticDTO;
import com.example.mpp1.Repository.CarModelRepository;
import com.example.mpp1.Service.CarModelService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/cars")
public class CarModelController {

    @Autowired
    private CarModelService service;

    @GetMapping()
    public List<CarModelDTO> getAll() {
        return service.getAll();
    }

    @PostMapping()
    public ResponseEntity<?> createCarModel(@RequestBody CarModel carModel) {
        return service.createCarModel(carModel);
    }

    @PostMapping("/create")
    public List<CarModel> createCarModels(@RequestBody List<CarModel> carModels) {
        return service.createCarModels(carModels);
    }

    @GetMapping("/{id}")
    public CarModel findID(@PathVariable("id") Long carID){
        return service.findID(carID);
    }

    @GetMapping("/statistic/{count}")
    public List<CarModelStatisticDTO> getAllSortedByPriceWhichAppearInCountPurchases(@PathVariable("count") Integer count) {
        return service.getAllSortedByPriceWhichAppearInCountPurchases(count);
    }

    @PutMapping("/{id}")
    public CarModel updateCarModel(@RequestBody CarModel carModel, @PathVariable("id") Long carID){
        return service.updateCarModel(carModel, carID);
    }

    @DeleteMapping("/{id}")
    public String deleteCarModel(@PathVariable("id") Long carID){
        return deleteCarModel(carID);
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
