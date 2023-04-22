package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.CarsOnPurchaseDTO;
import com.example.mpp1.Repository.CarsOnPurchaseRepository;
import com.example.mpp1.Service.CarsOnPurchaseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/carsonpurchases")
public class CarsOnPurchaseController {

    @Autowired
    private CarsOnPurchaseService service;

    @GetMapping()
    public List<CarsOnPurchaseDTO> getAll() {
        return service.getAll();
    }

    @PostMapping()
    public CarsOnPurchase createCarsOnPurchase(@RequestBody CarsOnPurchase carsOnPurchase) {
        return service.createCarsOnPurchase(carsOnPurchase);
    }

//    @PostMapping("/cars/{id}/shipment")
//    public CarsOnPurchase createCarsOnPurchase(@RequestBody CarsOnPurchaseDTO dto, @PathVariable("id") Long id) {
//        return repository.
//    }

    @PostMapping("/create")
    public List<CarsOnPurchase> createCarOnPurchases(@RequestBody List<CarsOnPurchase> carsOnPurchases) {
        return service.createCarOnPurchases(carsOnPurchases);
    }

    @GetMapping("/{id}")
    public CarsOnPurchase findID(@PathVariable("id") Long id) {
        return service.findID(id);
    }

    @PutMapping("/{id}")
    public CarsOnPurchase updateCarOnPurchase(@RequestBody CarsOnPurchase carsOnPurchase, @PathVariable("id") Long id){
        return service.updateCarOnPurchase(carsOnPurchase, id);
    }

    @DeleteMapping("/{id}")
    public String deleteCarsOnPurchase(@PathVariable("id") Long id){
        return service.deleteCarsOnPurchase(id);
    }

}
