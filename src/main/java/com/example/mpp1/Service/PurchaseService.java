package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.CarModelRepository;
import com.example.mpp1.Repository.PurchaseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

//@Service
//public class PurchaseService {
//
//    @Autowired
//    private PurchaseRepository repository;
//
//    @Autowired
//    private ModelMapper modelMapper = new ModelMapper();
//
//    @Autowired
//    private UserService user_service;
//
//    public List<PurchaseDTO> getAll() {
//        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
//    }
//
//    public Page<PurchaseDTO> getPage(Pageable page) {
//        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
//        return repository.findAllByOrderById(page).map(this::convertToDto);
//    }
//
//    public Purchase createPurchase(Purchase purchase) {
//        return repository.save(purchase);
//    }
//
//    public List<Purchase> createPurchases(List<Purchase> purchases) {
//        return repository.saveAll(purchases);
//    }
//
//    public Purchase findID(Long purchaseID) {
//        return repository.findById(purchaseID).get();
//    }
//
//    public Integer findCountForUser(Long userID) {
//        return repository.countByUserId(userID);
//    }
//
//    public Purchase ValidateUserRole(Long elementID) throws Exception {
//        // Check to see if the request user is the same as the session one
//        Purchase element = findID(elementID);
//        if (element == null) {
//            throw new Exception("Purchase with id " + elementID + " doesn't exist");
//        }
//        user_service.ValidateUser(element, "ROLE_REGULAR");
//        return element;
//    }
//
//    public Purchase updatePurchase(Purchase purchase, Long purchaseID) throws Exception {
//        Purchase old_purchase = ValidateUserRole(purchaseID);
//        old_purchase = purchase;
//        return repository.save(old_purchase);
//    }
//
//    public String deletePurchase(Long purchaseID) throws Exception {
//        ValidateUserRole(purchaseID);
//        repository.deleteById(purchaseID);
//        return "Interesting successfully deleted";
//    }
//
//    public Page<PurchaseStatisticDTO> purchasesWithStatus(String status, Pageable pageable) {
//        Page<Purchase> purchases = repository.findAllByStatusEquals(status, pageable);
//        List<PurchaseStatisticDTO> output_list = new ArrayList<PurchaseStatisticDTO>();
//        purchases.forEach(purchase -> {
//            int current_count = purchase.getCarsOnPurchaseList().stream().mapToInt(CarsOnPurchase::getCount).sum();
//            output_list.add(convertToStatisticDTO(purchase, current_count));
//        });
//        output_list.sort(Comparator.comparing(PurchaseStatisticDTO::getCarsPurchased));
//        return new PageImpl<>(output_list, pageable, repository.countByStatus(status));
//    }
//
//    private PurchaseDTO convertToDto(Purchase element) {
//        PurchaseDTO dto = modelMapper.map(element, PurchaseDTO.class);
//        dto.setCarsPurchased(element.getCarsOnPurchaseList().stream().mapToInt(CarsOnPurchase::getCount).sum());
//        dto.setCustomerID(element.getOriginal_customer().getId());
//        return dto;
//    }
//
//    private PurchaseStatisticDTO convertToStatisticDTO(Purchase element, Integer totalCount) {
//        PurchaseStatisticDTO dto = modelMapper.map(element, PurchaseStatisticDTO.class);
//        dto.setCarsPurchased(totalCount);
//        return dto;
//    }
//
//}

@Service
public class PurchaseService extends ServiceBase<PurchaseDTO, Purchase> {

    private final PurchaseRepository repository;

    @Autowired
    public PurchaseService(PurchaseRepository repository, UserService user_service) {
        super(repository, "Purchase", user_service);
        this.repository = repository;
    }

    private PurchaseStatisticDTO convertToStatisticDTO(Purchase element, Integer totalCount) {
        ModelMapper modelMapper = new ModelMapper();
        PurchaseStatisticDTO dto = modelMapper.map(element, PurchaseStatisticDTO.class);
        dto.setCarsPurchased(totalCount);
        return dto;
    }

    public Page<PurchaseStatisticDTO> purchasesWithStatus(String status, Pageable pageable) {
        Page<Purchase> purchases = repository.findAllByStatusEqualsOrderById(status, pageable);
        List<PurchaseStatisticDTO> output_list = new ArrayList<PurchaseStatisticDTO>();
        purchases.forEach(purchase -> {
            int current_count = purchase.getCarsOnPurchaseList().stream().mapToInt(CarsOnPurchase::getCount).sum();
            output_list.add(convertToStatisticDTO(purchase, current_count));
        });
        output_list.sort(Comparator.comparing(PurchaseStatisticDTO::getCarsPurchased));
        return new PageImpl<>(output_list, pageable, repository.countByStatus(status));
    }

    public Page<Purchase> filter(String filter_string) {
        Pageable page_request = PageRequest.of(0, 20);
        return repository.findByCustomerName(filter_string, page_request);
    }

}
