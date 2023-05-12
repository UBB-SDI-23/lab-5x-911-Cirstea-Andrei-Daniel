package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarModelDTO;
import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.CarsOnPurchaseDTO;
import com.example.mpp1.Repository.CarsOnPurchaseRepository;
import com.example.mpp1.Service.CarModelService;
import com.example.mpp1.Service.CarsOnPurchaseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "/api/carsonpurchases")
//public class CarsOnPurchaseController {
//
//    @Autowired
//    private CarsOnPurchaseService service;
//
//    @GetMapping()
//    public List<CarsOnPurchaseDTO> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/paged")
//    public Page<CarsOnPurchaseDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getPage(page_request);
//    }
//
//    @PostMapping()
//    public CarsOnPurchase createCarsOnPurchase(@RequestBody CarsOnPurchase carsOnPurchase) {
//        return service.createCarsOnPurchase(carsOnPurchase);
//    }
//
//    @PostMapping("/create")
//    public List<CarsOnPurchase> createCarOnPurchases(@RequestBody List<CarsOnPurchase> carsOnPurchases) {
//        return service.createCarOnPurchases(carsOnPurchases);
//    }
//
//    @GetMapping("/find/{id}")
//    public CarsOnPurchase findID(@PathVariable("id") Long id) {
//        return service.findID(id);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateCarOnPurchase(@RequestBody CarsOnPurchase carsOnPurchase, @PathVariable("id") Long id) {
//        try {
//            return new ResponseEntity<>(service.updateCarOnPurchase(carsOnPurchase, id), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteCarsOnPurchase(@PathVariable("id") Long id){
//        try {
//            return new ResponseEntity<>(service.deleteCarsOnPurchase(id), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//}

@RestController
@RequestMapping(path = "/api/carsonpurchases")
public class CarsOnPurchaseController extends ControllerBase<CarsOnPurchaseDTO, CarsOnPurchase> {

    @Autowired
    public CarsOnPurchaseController(CarsOnPurchaseService service) {
        super(service);
    }

}

