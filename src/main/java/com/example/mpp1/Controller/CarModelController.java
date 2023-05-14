package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarModelDTO;
import com.example.mpp1.Model.CarModelStatisticDTO;
import com.example.mpp1.Model.CarModelValidator;
import com.example.mpp1.Repository.CarModelRepository;
import com.example.mpp1.Service.CarModelService;
import jakarta.annotation.security.RolesAllowed;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "/api/cars")
//public class CarModelController {
//
//    @Autowired
//    private CarModelService service;
//
//    @GetMapping()
//    public List<CarModelDTO> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/paged")
//    public Page<CarModelDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getPage(page_request);
//    }
//
//    @PostMapping()
//    @RolesAllowed({"ROLE_REGULAR", "ROLE_MODERATOR", "ROLE_ADMIN"})
//    public ResponseEntity<?> createCarModel(@RequestBody CarModel carModel) {
//        try {
//            return new ResponseEntity<>(service.create(carModel), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @PostMapping("/create")
//    @RolesAllowed({"ROLE_REGULAR", "ROLE_MODERATOR", "ROLE_ADMIN"})
//    public List<CarModel> createCarModels(@RequestBody List<CarModel> carModels) {
//        return service.createList(carModels);
//    }
//
//    @GetMapping("/find/{id}")
//    public ResponseEntity<?> findID(@PathVariable("id") Long carID){
//        try {
//            CarModel carModel = service.findID(carID);
//            return new ResponseEntity<>(carModel, HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
////    @GetMapping("/statistic")
////    public Page<CarModelStatisticDTO> getCarModelsSortedByTotalUnitsSold(
////            @RequestParam(defaultValue = "0", required = false) Integer page,
////            @RequestParam(defaultValue = "10", required = false) Integer page_size
////    ) {
////        Pageable page_request = PageRequest.of(page, page_size);
////        return service.getCarModelsWithPurchaseCount(page_request);
////    }
//
//    @PutMapping("/{id}")
//    @RolesAllowed({"ROLE_REGULAR", "ROLE_MODERATOR", "ROLE_ADMIN"})
//    public ResponseEntity<?> updateCarModel(@RequestBody CarModel carModel, @PathVariable("id") Long carID){
//        try {
//            carModel = service.update(carModel, carID);
//            return new ResponseEntity<>(carModel, HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteCarModel(@PathVariable("id") Long carID) {
//        try {
//            return new ResponseEntity<>(service.delete(carID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleValidationExceptions(
//            MethodArgumentNotValidException ex) {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }
//}

@RestController
@RequestMapping(path = "/api/cars")
public class CarModelController extends ControllerBase<CarModelDTO, CarModel> {

    @Autowired
    public CarModelController(CarModelService service) {
        super(service);
    }

}


