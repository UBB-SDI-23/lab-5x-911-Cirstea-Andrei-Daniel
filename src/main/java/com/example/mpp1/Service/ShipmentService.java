package com.example.mpp1.Service;

import com.example.mpp1.Model.PurchaseDTO;
import com.example.mpp1.Model.Shipment;
import com.example.mpp1.Model.ShipmentDTO;
import com.example.mpp1.Repository.ShipmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ShipmentDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<ShipmentDTO> getPage(Pageable page) {
        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
        return repository.findAll(page).map(this::convertToDto);
    }

    public Long getEntityCount() {
        return repository.count();
    }

    public Shipment createShipment(Shipment shipment) {
        return repository.save(shipment);
    }

    public List<Shipment> createShipments(List<Shipment> shipments) {
        return repository.saveAll(shipments);
    }

    public Shipment findID(Long shipmentID){
        return repository.findById(shipmentID).get();
    }

    public List<ShipmentDTO> filterByIDHigher(Long id) {
        List<Shipment> list = repository.findByIdGreaterThanEqual(id);
        return list.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Shipment updateShipment(Shipment shipment, Long shipmentID) {
        Shipment old_shipment = findID(shipmentID);
        old_shipment = shipment;
        return  repository.save(old_shipment);
    }

    public String deleteShipment(Long shipmentID){
        repository.deleteById(shipmentID);
        return "Shipment successfully deleted";
    }

    private ShipmentDTO convertToDto(Shipment shipment) {
        ShipmentDTO dto = modelMapper.map(shipment, ShipmentDTO.class);
        dto.setDistributorID(shipment.getParent_distributor().getId());
        return dto;
    }

}
