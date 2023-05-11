package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.DistributorRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private DistributorRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public List<DistributorDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<DistributorDTO> getPage(Pageable page) {
        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
        return repository.findAllByOrderById(page).map(this::convertToDto);
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

    public Page<DistributorStatisticDTO> getDistributorsSortedByAverageShipmentPrice(Pageable pageable) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<DistributorStatisticDTO> query = builder.createQuery(DistributorStatisticDTO.class);
        Root<Distributor> root = query.from(Distributor.class);
        Join<Distributor, Shipment> shipmentJoin = root.join("shipments", JoinType.LEFT);

        Expression<Double> avgPrice = builder.avg(shipmentJoin.get("totalPrice"));
        query.select(builder.construct(
                        DistributorStatisticDTO.class,
                        root.get("id"),
                        root.get("name"),
                        root.get("cooperationStartDate"),
                        root.get("country"),
                        root.get("contactEmail"),
                        root.get("category"),
                        builder.coalesce(builder.toInteger(avgPrice), 0)
                ))
                .groupBy(root)
                .orderBy(builder.desc(builder.coalesce(builder.toInteger(avgPrice), 0)));

        TypedQuery<DistributorStatisticDTO> typedQuery = entityManager.createQuery(query);

// Set pagination
        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setMaxResults(pageable.getPageSize());

        CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
        countQuery.select(builder.count(countQuery.from(Distributor.class)));
        Long count = entityManager.createQuery(countQuery).getSingleResult();

        List<DistributorStatisticDTO> distributorStatisticDTOList = typedQuery.getResultList();
        return new PageImpl<>(distributorStatisticDTOList, pageable, count);
    }

    public Distributor findID(Long distributorID){
        return repository.findById(distributorID).get();
    }

    public Integer findCountForUser(Long userID) {
        return repository.countByUserId(userID);
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

    private DistributorDTO convertToDto(Distributor distributor) {
        DistributorDTO dto = modelMapper.map(distributor, DistributorDTO.class);
        dto.setShipmentCount(distributor.getShipments().size());
        return dto;
    }

}
