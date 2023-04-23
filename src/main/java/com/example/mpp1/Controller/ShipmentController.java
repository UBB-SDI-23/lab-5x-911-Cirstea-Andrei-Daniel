package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.ShipmentRepository;
import com.example.mpp1.Service.ShipmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentService service;

    @GetMapping()
    public List<ShipmentDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/paged")
    public List<ShipmentDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
        Pageable page_request = PageRequest.of(page, page_size);
        return service.getPage(page_request);
    }

    @PostMapping()
    public Shipment createShipment(@RequestBody Shipment shipment) {
        return service.createShipment(shipment);
    }

    @PostMapping("/create")
    public List<Shipment> createShipments(@RequestBody List<Shipment> shipments) {
        return service.createShipments(shipments);
    }

    @GetMapping("/{id}")
    public Shipment findID(@PathVariable("id") Long shipmentID){
        return service.findID(shipmentID);
    }

    @GetMapping("/filter/{id}")
    public List<ShipmentDTO> filterByIDHigher(@PathVariable("id") Long id) {
        return service.filterByIDHigher(id);
    }

    @PutMapping("/{id}")
    public Shipment updateShipment(@RequestBody Shipment shipment, @PathVariable("id") Long shipmentID) {
        return service.updateShipment(shipment, shipmentID);
    }

    @DeleteMapping("/{id}")
    public String deleteShipment(@PathVariable("id") Long shipmentID){
        return service.deleteShipment(shipmentID);
    }

}
