package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.CarModelRepository;
import com.example.mpp1.Repository.CarsOnPurchaseRepository;
import org.apache.commons.lang3.Validate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Service
//public class CarsOnPurchaseService {
//
//    @Autowired
//    private CarsOnPurchaseRepository repository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Autowired
//    private UserService user_service;
//
//    public List<CarsOnPurchaseDTO> getAll() {
//        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
//    }
//
//    public Page<CarsOnPurchaseDTO> getPage(Pageable page) {
//        return repository.findAllByOrderById(page).map(this::convertToDto);
//    }
//
//    public CarsOnPurchase createCarsOnPurchase(CarsOnPurchase carsOnPurchase) {
//        return repository.save(carsOnPurchase);
//    }
//
//    public List<CarsOnPurchase> createCarOnPurchases(List<CarsOnPurchase> carsOnPurchases) {
//        List<CarsOnPurchase> final_list = new ArrayList<CarsOnPurchase>();
//        for (int index = 0; index < carsOnPurchases.size(); index++) {
//            CarsOnPurchase current = carsOnPurchases.get(index);
//
//            int subindex = index - 1;
//            for (; subindex >= 0; subindex--) {
//                CarsOnPurchase compare_cars_on_purchase = carsOnPurchases.get(subindex);
//                if (compare_cars_on_purchase.getId().equals(current.getId()) &&
//                        compare_cars_on_purchase.getCarModel().getId().equals(current.getCarModel().getId())
//                        && compare_cars_on_purchase.getPurchase().getId().equals(current.getPurchase().getId())) {
//                    break;
//                }
//            }
//
//            if (subindex < 0) {
//                final_list.add(current);
//            }
//        }
//
//        return repository.saveAll(final_list);
//    }
//
//    public CarsOnPurchase findID(Long id) {
//        return repository.findById(id).get();
//    }
//
//    public Integer findCountForUser(Long userID) {
//        return repository.countByUserId(userID);
//    }
//
//    public CarsOnPurchase ValidateUserRole(Long elementID) throws Exception {
//        // Check to see if the request user is the same as the session one
//        CarsOnPurchase element = findID(elementID);
//        if (element == null) {
//            throw new Exception("Car Order with id " + elementID + " doesn't exist");
//        }
//        user_service.ValidateUser(element, "ROLE_REGULAR");
//        return element;
//    }
//
//    public CarsOnPurchase updateCarOnPurchase(CarsOnPurchase carsOnPurchase, Long id) throws Exception {
//        CarsOnPurchase old_carsOnPurchase = ValidateUserRole(id);
//        old_carsOnPurchase = carsOnPurchase;
//        return repository.save(old_carsOnPurchase);
//    }
//
//    public String deleteCarsOnPurchase(Long id) throws Exception {
//        ValidateUserRole(id);
//        repository.deleteById(id);
//        return "Car Order successfully deleted";
//    }
//
//    private CarsOnPurchaseDTO convertToDto(CarsOnPurchase element) {
//        return modelMapper.map(element, CarsOnPurchaseDTO.class);
//    }
//
//}

@Service
public class CarsOnPurchaseService extends ServiceBase<CarsOnPurchaseDTO, CarsOnPurchase> {

    @Autowired
    public CarsOnPurchaseService(CarsOnPurchaseRepository repository, UserService user_service) {
        super(repository, "Car Model", user_service);
    }

}
