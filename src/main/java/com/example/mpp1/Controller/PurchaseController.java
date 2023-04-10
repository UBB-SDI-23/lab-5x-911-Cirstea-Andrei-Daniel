package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.PurchaseRepository;
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
    private PurchaseRepository repository;

    private ModelMapper modelMapper = new ModelMapper();

    @GetMapping()
    public List<PurchaseDTO> getAll() {
        Pageable pageRequest = PageRequest.of(0, 100);
        return repository.findAll(pageRequest).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping()
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return repository.save(purchase);
    }

    @PostMapping("/create")
    public List<Purchase> createPurchases(@RequestBody List<Purchase> purchases) {
        return repository.saveAll(purchases);
    }

    @GetMapping("/{id}")
    public Purchase findID(@PathVariable("id") Long purchaseID) {
        return repository.findById(purchaseID).get();
    }

    @PutMapping("/{id}")
    public Purchase updatePurchase(@RequestBody Purchase purchase, @PathVariable("id") Long purchaseID){
        Purchase old_purchase = findID(purchaseID);
        old_purchase = purchase;
        return repository.save(old_purchase);
    }

    @DeleteMapping("/{id}")
    public String deletePurchase(@PathVariable("id") Long purchaseID){
        repository.deleteById(purchaseID);
        return "Interesting successfully deleted";
    }

    @GetMapping("/statistic/{status}/{count}")
    public List<PurchaseStatisticDTO> purchasesWithStatusWithCountGreater(@PathVariable("status") String status, @PathVariable("count") Long count) {
        List<Purchase> purchases = repository.findAllByStatusEquals(status);
        List<PurchaseStatisticDTO> output_list = new ArrayList<PurchaseStatisticDTO>();
        purchases.forEach(purchase -> {
            int current_count = purchase.getCarsOnPurchaseList().stream().mapToInt(CarsOnPurchase::getCount).sum();
            if (current_count >= count) {
                output_list.add(convertToStatisticDTO(purchase, current_count));
            }
        });
        output_list.sort(Comparator.comparing(PurchaseStatisticDTO::getCarsPurchased));
        return output_list;
    }

    private PurchaseDTO convertToDto(Purchase element) {
        PurchaseDTO dto = modelMapper.map(element, PurchaseDTO.class);
        dto.setCustomerID(element.getOriginal_customer().getId());
        return dto;
    }

    private PurchaseStatisticDTO convertToStatisticDTO(Purchase element, Integer totalCount) {
        PurchaseStatisticDTO dto = modelMapper.map(element, PurchaseStatisticDTO.class);
        dto.setCarsPurchased(totalCount);
        dto.setCustomerID(element.getOriginal_customer().getId());
        return dto;
    }

}
