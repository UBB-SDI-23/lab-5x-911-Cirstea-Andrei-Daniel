package com.example.mpp1.Controller;

import com.example.mpp1.Jwt.JwtMessage;
import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.PurchaseRepository;
import com.example.mpp1.Service.DistributorService;
import com.example.mpp1.Service.PurchaseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.event.TableModelListener;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "/api/purchases")
//public class PurchaseController {
//
//    @Autowired
//    private PurchaseService service;
//
//    @GetMapping()
//    public List<PurchaseDTO> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/paged")
//    public Page<PurchaseDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getPage(page_request);
//    }
//
//    @PostMapping()
//    public Purchase createPurchase(@RequestBody Purchase purchase) {
//        return service.create(purchase);
//    }
//
//    @PostMapping("/create")
//    public List<Purchase> createPurchases(@RequestBody List<Purchase> purchases) {
//        return service.createList(purchases);
//    }
//
//    @GetMapping("/find/{id}")
//    public Purchase findID(@PathVariable("id") Long purchaseID) {
//        try {
//
//        }
//        catch (Exception exception) {
//
//        }
//        return service.findID(purchaseID);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updatePurchase(@RequestBody Purchase purchase, @PathVariable("id") Long purchaseID) {
//        try {
//            return new ResponseEntity<>(service.update(purchase, purchaseID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deletePurchase(@PathVariable("id") Long purchaseID) {
//        try {
//            return new ResponseEntity<>(service.deletePurchase(purchaseID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @GetMapping("/filter/{status}")
//    public Page<PurchaseStatisticDTO> purchasesWithStatus(@PathVariable("status") String status,
//                                                          @RequestParam(defaultValue = "0", required = false) Integer page,
//                                                          @RequestParam(defaultValue = "10", required = false) Integer page_size
//    ) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.purchasesWithStatus(status, page_request);
//    }
//
//}

@RestController
@RequestMapping(path = "/api/purchases")
public class PurchaseController extends ControllerBase<PurchaseDTO, Purchase> {

    private final PurchaseService service;

    @Autowired
    public PurchaseController(PurchaseService service) {
        super(service);
        this.service = service;
    }

    @GetMapping("/filter/{status}")
    public Page<PurchaseStatisticDTO> purchasesWithStatus(@PathVariable("status") String status,
                                                          @RequestParam(defaultValue = "0", required = false) Integer page,
                                                          @RequestParam(defaultValue = "10", required = false) Integer page_size
    ) {
        Pageable page_request = PageRequest.of(page, page_size);
        return service.purchasesWithStatus(status, page_request);
    }

}