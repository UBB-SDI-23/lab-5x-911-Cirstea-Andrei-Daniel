package com.example.mpp1.Service;

import com.example.mpp1.Model.CarsOnPurchaseDTO;
import com.example.mpp1.Model.Distributor;
import com.example.mpp1.Model.DistributorDTO;
import com.example.mpp1.Repository.DistributorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DistributorService {

    @Autowired
    private DistributorRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public List<DistributorDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<DistributorDTO> getPage(Pageable page) {
        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
        return repository.findAll(page).map(this::convertToDto);
    }

    public ResponseEntity<?> createDistributor(Distributor distributor) {
        if (distributor.getCategory() == null || (!distributor.getCategory().equals("NewCars") && !distributor.getCategory().equals("UsedCars"))){
            return new ResponseEntity<>("Distributor category is missing or is not NewCars or UsedCars", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(repository.save(distributor), HttpStatus.OK);
    }

    public List<Distributor> createDistributors(List<Distributor> distributors) {
        distributors = distributors.stream().filter(distributor -> {
            if (distributor.getCategory() == null || (!distributor.getCategory().equals("NewCars") && !distributor.getCategory().equals("UsedCars"))){
                return false;
            }
            return true;
        }).toList();
        return repository.saveAll(distributors);
    }

    public Distributor findID(Long distributorID){
        return repository.findById(distributorID).get();
    }

    public Distributor updateDistributor(Distributor distributor, Long distributorID){
        Distributor old_distributor = findID(distributorID);
        old_distributor = distributor;
        return  repository.save(old_distributor);
    }

    public String deleteDistributor(Long distributorID){
        repository.deleteById(distributorID);
        return "Distributor successfully deleted";
    }

    private DistributorDTO convertToDto(Distributor shipment) {
        DistributorDTO dto = modelMapper.map(shipment, DistributorDTO.class);
        dto.setShipmentCount(shipment.getShipments().size());
        return dto;
    }

}
