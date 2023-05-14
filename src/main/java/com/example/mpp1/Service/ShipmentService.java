package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.PurchaseRepository;
import com.example.mpp1.Repository.ShipmentRepository;
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
//public class ShipmentService {
//
//    @Autowired
//    private ShipmentRepository repository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Autowired
//    private UserService user_service;
//
//    public List<ShipmentDTO> getAll() {
//        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
//    }
//
//    public Page<ShipmentDTO> getPage(Pageable page) {
//        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
//        return repository.findAllByOrderById(page).map(this::convertToDto);
//    }
//
//    public Shipment createShipment(Shipment shipment) {
//        return repository.save(shipment);
//    }
//
//    public List<Shipment> createShipments(List<Shipment> shipments) {
//        return repository.saveAll(shipments);
//    }
//
//    public Shipment findID(Long shipmentID){
//        return repository.findById(shipmentID).get();
//    }
//
//    public Integer findCountForUser(Long userID) {
//        return repository.countByUserId(userID);
//    }
//
//    public Shipment ValidateUserRole(Long elementID) throws Exception {
//        // Check to see if the request user is the same as the session one
//        Shipment element = findID(elementID);
//        if (element == null) {
//            throw new Exception("Shipment with id " + elementID + " doesn't exist");
//        }
//        user_service.ValidateUser(element, "ROLE_REGULAR");
//        return element;
//    }
//
//    public Shipment updateShipment(Shipment shipment, Long shipmentID) throws Exception {
//        Shipment old_shipment = ValidateUserRole(shipmentID);
//        old_shipment = shipment;
//        return  repository.save(old_shipment);
//    }
//
//    public String deleteShipment(Long shipmentID) throws Exception {
//        ValidateUserRole(shipmentID);
//        repository.deleteById(shipmentID);
//        return "Shipment successfully deleted";
//    }
//
//    private ShipmentDTO convertToDto(Shipment shipment) {
//        ShipmentDTO dto = modelMapper.map(shipment, ShipmentDTO.class);
//        dto.setDistributorID(shipment.getParent_distributor().getId());
//        return dto;
//    }
//
//}

@Service
public class ShipmentService extends ServiceBase<ShipmentDTO, Shipment> {

    //private final ShipmentRepository repository;

    @Autowired
    public ShipmentService(ShipmentRepository repository, UserService user_service) {
        super(repository, "Purchase", user_service);
    }

}

