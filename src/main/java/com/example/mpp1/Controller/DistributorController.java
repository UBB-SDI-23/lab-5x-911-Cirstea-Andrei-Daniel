package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.DistributorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    private DistributorRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public List<DistributorDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList()).subList(0, 100);
    }

    @PostMapping()
    public ResponseEntity<?> createDistributor(@RequestBody Distributor distributor) {
        if (distributor.getCategory() == null || (!distributor.getCategory().equals("NewCars") && !distributor.getCategory().equals("UsedCars"))){
            return new ResponseEntity<>("Distributor category is missing or is not NewCars or UsedCars", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(repository.save(distributor), HttpStatus.OK);
    }

    @PostMapping("/create")
    public List<Distributor> createDistributors(@RequestBody List<Distributor> distributors) {
        distributors = distributors.stream().filter(distributor -> {
            if (distributor.getCategory() == null || (!distributor.getCategory().equals("NewCars") && !distributor.getCategory().equals("UsedCars"))){
                return false;
            }
            return true;
        }).toList();
        return repository.saveAll(distributors);
    }

    @GetMapping("/{id}")
    public Distributor findID(@PathVariable("id") Long distributorID){
        return repository.findById(distributorID).get();
    }

    @PutMapping("/{id}")
    public Distributor updateDistribution(@RequestBody Distributor distributor, @PathVariable("id") Long distributorID){
        Distributor old_distributor = findID(distributorID);
        old_distributor = distributor;
        return  repository.save(old_distributor);
    }

    @DeleteMapping("/{id}")
    public String deleteDistributor(@PathVariable("id") Long distributorID){
        repository.deleteById(distributorID);
        return "Distributor successfully deleted";
    }

    private DistributorDTO convertToDto(Distributor shipment) {
        return modelMapper.map(shipment, DistributorDTO.class);
    }

}
