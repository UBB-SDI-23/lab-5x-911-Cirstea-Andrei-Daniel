package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.Distributor;
import com.example.mpp1.Model.Shipment;
import com.example.mpp1.Model.ShipmentDTO;
import com.example.mpp1.Repository.ShipmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin()
@RestController
@RequestMapping(path = "/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public List<ShipmentDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping()
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return repository.save(shipment);
    }

    @PostMapping("/create")
    public List<Shipment> createShipments(@RequestBody List<Shipment> shipments) {
        return repository.saveAll(shipments);
    }

    @GetMapping("/{id}")
    public Shipment findID(@PathVariable("id") Long distributorID){
        return repository.findById(distributorID).get();
    }

    @GetMapping("/filter/{id}")
    public List<ShipmentDTO> filterByIDHigher(@PathVariable("id") Long id) {
        List<Shipment> list = repository.findByIdGreaterThanEqual(id);
        return list.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public Shipment updateShipment(@RequestBody Shipment shipment, @PathVariable("id") Long shipmentID) {
        Shipment old_shipment = findID(shipmentID);
        old_shipment = shipment;
        return  repository.save(old_shipment);
    }

    @DeleteMapping("/{id}")
    public String deleteShipment(@PathVariable("id") Long shipmentID){
        repository.deleteById(shipmentID);
        return "Shipment successfully deleted";
    }

    private ShipmentDTO convertToDto(Shipment shipment) {
        return modelMapper.map(shipment, ShipmentDTO.class);
    }

}
