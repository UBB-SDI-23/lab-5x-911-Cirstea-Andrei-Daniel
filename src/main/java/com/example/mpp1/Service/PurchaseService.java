package com.example.mpp1.Service;

import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.Purchase;
import com.example.mpp1.Model.PurchaseDTO;
import com.example.mpp1.Model.PurchaseStatisticDTO;
import com.example.mpp1.Repository.PurchaseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository repository;

    @Autowired
    private ModelMapper modelMapper = new ModelMapper();

    public List<PurchaseDTO> getAll() {
        Pageable pageRequest = PageRequest.of(0, 100);
        return repository.findAll(pageRequest).stream().map(purchase -> {
            int current_count = purchase.getCarsOnPurchaseList().stream().mapToInt(CarsOnPurchase::getCount).sum();
            return convertToDto(purchase, current_count);
        }).collect(Collectors.toList());
    }

    public Purchase createPurchase(Purchase purchase) {
        return repository.save(purchase);
    }

    public List<Purchase> createPurchases(List<Purchase> purchases) {
        return repository.saveAll(purchases);
    }

    public Purchase findID(Long purchaseID) {
        return repository.findById(purchaseID).get();
    }

    public Purchase updatePurchase(Purchase purchase, Long purchaseID){
        Purchase old_purchase = findID(purchaseID);
        old_purchase = purchase;
        return repository.save(old_purchase);
    }

    public String deletePurchase(Long purchaseID){
        repository.deleteById(purchaseID);
        return "Interesting successfully deleted";
    }

    public List<PurchaseStatisticDTO> purchasesWithStatusWithCountGreater(String status, Long count) {
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

    private PurchaseDTO convertToDto(Purchase element, Integer totalCount) {
        PurchaseDTO dto = modelMapper.map(element, PurchaseDTO.class);
        dto.setCarsPurchased(totalCount);
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
