package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.ShipmentRepository;
import com.example.mpp1.Service.PurchaseService;
import com.example.mpp1.Service.ShipmentService;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "/api/shipments")
//public class ShipmentController {
//
//    @Autowired
//    private ShipmentService service;
//
//    @GetMapping()
//    public List<ShipmentDTO> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/paged")
//    public Page<ShipmentDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getPage(page_request);
//    }
//
//    @PostMapping()
//    public Shipment createShipment(@RequestBody Shipment shipment) {
//        return service.createShipment(shipment);
//    }
//
//    @PostMapping("/create")
//    public List<Shipment> createShipments(@RequestBody List<Shipment> shipments) {
//        return service.createShipments(shipments);
//    }
//
//    @GetMapping("/find/{id}")
//    public Shipment findID(@PathVariable("id") Long shipmentID){
//        return service.findID(shipmentID);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateShipment(@RequestBody Shipment shipment, @PathVariable("id") Long shipmentID) {
//        try {
//            return new ResponseEntity<>(service.updateShipment(shipment, shipmentID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteShipment(@PathVariable("id") Long shipmentID){
//        try {
//            return new ResponseEntity<>(service.deleteShipment(shipmentID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//}

@RestController
@RequestMapping(path = "/api/shipments")
public class ShipmentController extends ControllerBase<ShipmentDTO, Shipment> {

    @Autowired
    public ShipmentController(ShipmentService service) {
        super(service);
    }

}
