package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarModelDTO;
import com.example.mpp1.Model.CarModelStatisticDTO;
import com.example.mpp1.Repository.CarModelRepository;
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
    private CarModelRepository repository;

    private ModelMapper modelMapper = new ModelMapper();

    @GetMapping()
    public List<CarModelDTO> getAll() {
        Pageable pageRequest = PageRequest.of(0, 100);
        return repository.findAll(pageRequest).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping()
    public ResponseEntity<?> createCarModel(@RequestBody CarModel carModel) {
        if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
                || carModel.getManufacturer().equals("")) {
            return new ResponseEntity<>("Invalid car model or manufacturer", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(repository.save(carModel), HttpStatus.OK);
    }

    @PostMapping("/create")
    public List<CarModel> createCarModels(@RequestBody List<CarModel> carModels) {
        carModels = carModels.stream().filter(carModel -> {
            if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
                    || carModel.getManufacturer().equals("")) {
                return false;
            }
            return true;
        }).toList();

        return repository.saveAll(carModels);
    }

    @GetMapping("/{id}")
    public CarModel findID(@PathVariable("id") Long carID){
        return repository.findById(carID).get();
    }

    @GetMapping("/statistic/{count}")
    public List<CarModelStatisticDTO> getAllSortedByPriceWhichAppearInCountPurchases(@PathVariable("count") Integer count) {
        List<CarModelStatisticDTO> output_list = new ArrayList<CarModelStatisticDTO>();

        repository.findAll().stream().forEach(carModel -> {
            if (carModel.getCarsOnPurchaseList().size() >= count) {
                output_list.add(convertToStatisticDto(carModel, carModel.getCarsOnPurchaseList().size()));
            }
        });
        output_list.sort(Comparator.comparing(CarModelStatisticDTO::getPrice));
        return output_list;
    }

    @PutMapping("/{id}")
    public CarModel updateCarModel(@RequestBody CarModel carModel, @PathVariable("id") Long carID){
        CarModel old_carModel = findID(carID);
        old_carModel = carModel;
        return repository.save(old_carModel);
    }

    @DeleteMapping("/{id}")
    public String deleteCarModel(@PathVariable("id") Long carID){
        repository.deleteById(carID);
        return "Car successfully deleted";
    }

    private CarModelDTO convertToDto(CarModel element) {
        return modelMapper.map(element, CarModelDTO.class);
    }

    private CarModelStatisticDTO convertToStatisticDto(CarModel element, Integer purchaseCount) {
        CarModelStatisticDTO dto = modelMapper.map(element, CarModelStatisticDTO.class);
        dto.setPurchaseCount(purchaseCount);
        return dto;
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
