package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.PurchaseRepository;
import com.example.mpp1.Service.PurchaseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.swing.event.TableModelListener;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService service;

    @GetMapping()
    public List<PurchaseDTO> getAll() {
        return service.getAll();
    }

    @PostMapping()
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return service.createPurchase(purchase);
    }

    @PostMapping("/create")
    public List<Purchase> createPurchases(@RequestBody List<Purchase> purchases) {
        return service.createPurchases(purchases);
    }

    @GetMapping("/{id}")
    public Purchase findID(@PathVariable("id") Long purchaseID) {
        return service.findID(purchaseID);
    }

    @PutMapping("/{id}")
    public Purchase updatePurchase(@RequestBody Purchase purchase, @PathVariable("id") Long purchaseID){
        return service.updatePurchase(purchase, purchaseID);
    }

    @DeleteMapping("/{id}")
    public String deletePurchase(@PathVariable("id") Long purchaseID){
        return service.deletePurchase(purchaseID);
    }

    @GetMapping("/statistic/{status}/{count}")
    public List<PurchaseStatisticDTO> purchasesWithStatusWithCountGreater(@PathVariable("status") String status, @PathVariable("count") Long count) {
        return service.purchasesWithStatusWithCountGreater(status, count);
    }

}
