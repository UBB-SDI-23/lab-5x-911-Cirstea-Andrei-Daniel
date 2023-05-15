package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.DistributorRepository;
import com.example.mpp1.Service.CustomerService;
import com.example.mpp1.Service.DistributorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "/api/distributors")
//public class DistributorController {
//
//    @Autowired
//    private DistributorService service;
//
//    @GetMapping()
//    public List<DistributorDTO> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/paged")
//    public Page<DistributorDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getPage(page_request);
//    }
//
//    @PostMapping()
//    public ResponseEntity<?> createDistributor(@RequestBody Distributor distributor) {
//        return service.createDistributor(distributor);
//    }
//
//    @PostMapping("/create")
//    public List<Distributor> createDistributors(@RequestBody List<Distributor> distributors) {
//        return service.createDistributors(distributors);
//    }
//
//    @GetMapping("/statistic")
//    public Page<DistributorStatisticDTO> getDistributorsStatistic(
//            @RequestParam(defaultValue = "0", required = false) Integer page,
//            @RequestParam(defaultValue = "10", required = false) Integer page_size
//    ) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getDistributorsSortedByAverageShipmentPrice(page_request);
//    }
//
//    @GetMapping("/find/{id}")
//    public Distributor findID(@PathVariable("id") Long distributorID){
//        return service.findID(distributorID);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateDistributor(@RequestBody Distributor distributor, @PathVariable("id") Long distributorID) {
//        try {
//            return new ResponseEntity<>(service.updateDistributor(distributor, distributorID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteDistributor(@PathVariable("id") Long distributorID) {
//        try {
//            return new ResponseEntity<>(service.deleteDistributor(distributorID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//}

@RestController
@RequestMapping(path = "/api/distributors")
public class DistributorController extends ControllerBase<DistributorDTO, Distributor> {

    private final DistributorService service;

    @Autowired
    public DistributorController(DistributorService service) {
        super(service);
        this.service = service;
    }

    @GetMapping("/statistic")
    public Page<DistributorStatisticDTO> getDistributorsStatistic(
            @RequestParam(defaultValue = "0", required = false) Integer page,
            @RequestParam(defaultValue = "10", required = false) Integer page_size
    ) {
        Pageable page_request = PageRequest.of(page, page_size);
        return service.getDistributorsSortedByAverageShipmentPrice(page_request);
    }

    @GetMapping("/autocomplete")
    public Page<Distributor> searchCustomerByFirstNameAndLastName(@RequestParam("query") String query) {
        System.out.println(query);
        return service.filter(query == null ? "" : query);
    }

}
