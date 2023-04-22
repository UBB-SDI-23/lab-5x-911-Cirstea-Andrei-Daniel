package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.DistributorRepository;
import com.example.mpp1.Service.DistributorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/distributors")
public class DistributorController {

    @Autowired
    private DistributorService service;

    @GetMapping()
    public List<DistributorDTO> getAll() {
        return service.getAll();
    }

    @PostMapping()
    public ResponseEntity<?> createDistributor(@RequestBody Distributor distributor) {
        return service.createDistributor(distributor);
    }

    @PostMapping("/create")
    public List<Distributor> createDistributors(@RequestBody List<Distributor> distributors) {
        return service.createDistributors(distributors);
    }

    @GetMapping("/{id}")
    public Distributor findID(@PathVariable("id") Long distributorID){
        return service.findID(distributorID);
    }

    @PutMapping("/{id}")
    public Distributor updateDistributor(@RequestBody Distributor distributor, @PathVariable("id") Long distributorID){
        return service.updateDistributor(distributor, distributorID);
    }

    @DeleteMapping("/{id}")
    public String deleteDistributor(@PathVariable("id") Long distributorID){
        return service.deleteDistributor(distributorID);
    }

}
