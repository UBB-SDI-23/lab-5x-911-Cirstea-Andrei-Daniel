package com.example.mpp1.Service;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarModelDTO;
import com.example.mpp1.Model.CarModelStatisticDTO;
import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Repository.CarModelRepository;
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

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarModelService {
    @Autowired
    private CarModelRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    public Page<CarModelStatisticDTO> getCarModelsWithPurchaseCount(Pageable pageable) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<CarModelStatisticDTO> query = builder.createQuery(CarModelStatisticDTO.class);
        Root<CarModel> carModelRoot = query.from(CarModel.class);
        Join<CarModel, CarsOnPurchase> carModelCarsOnPurchaseJoin = carModelRoot.join("carsOnPurchaseList", JoinType.LEFT);

        query.multiselect(
                        carModelRoot.get("id"),
                        carModelRoot.get("model"),
                        carModelRoot.get("manufacturer"),
                        carModelRoot.get("price"),
                        carModelRoot.get("manufacture_year"),
                        carModelRoot.get("fuel_consumption"),
                        builder.coalesce(builder.sum(carModelCarsOnPurchaseJoin.get("count")), 0).alias("unitCount")
                ).groupBy(carModelRoot.get("id"))
                .orderBy(builder.desc(builder.coalesce(builder.sum(carModelCarsOnPurchaseJoin.get("count")), 0)));

        TypedQuery<CarModelStatisticDTO> typedQuery = entityManager.createQuery(query);

        System.out.println(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setMaxResults(pageable.getPageSize());

        List<CarModelStatisticDTO> resultList = typedQuery.getResultList();

        return new PageImpl<>(resultList, pageable, resultList.size());
    }

    private Long getCountForQuery(CriteriaQuery<?> cq) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        countQuery.select(cb.count(countQuery.from(cq.getResultType())));
        countQuery.where(cq.getRestriction());
        return entityManager.createQuery(countQuery).getSingleResult();
    }

    private ModelMapper modelMapper = new ModelMapper();

    public List<CarModelDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<CarModelDTO> getPage(Pageable page) {
        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
        return repository.findAll(page).map(this::convertToDto);
    }

    public ResponseEntity<?> createCarModel(CarModel carModel) {
        if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
                || carModel.getManufacturer().equals("")) {
            return new ResponseEntity<>("Invalid car model or manufacturer", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(repository.save(carModel), HttpStatus.OK);
    }

    public List<CarModel> createCarModels(List<CarModel> carModels) {
        carModels = carModels.stream().filter(carModel -> {
            if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
                    || carModel.getManufacturer().equals("")) {
                return false;
            }
            return true;
        }).toList();

        return repository.saveAll(carModels);
    }

    public CarModel findID(Long carID){
        return repository.findById(carID).get();
    }

    public CarModel updateCarModel(CarModel carModel, Long carID){
        CarModel old_carModel = findID(carID);
        old_carModel = carModel;
        return repository.save(old_carModel);
    }

    public String deleteCarModel(Long carID){
        repository.deleteById(carID);
        return "Car successfully deleted";
    }

    private CarModelDTO convertToDto(CarModel element) {
        CarModelDTO dto = modelMapper.map(element, CarModelDTO.class);
        dto.setPurchaseCount(element.getCarsOnPurchaseList().size());
        return dto;
    }

    private CarModelStatisticDTO convertToStatisticDto(CarModel element) {
        CarModelStatisticDTO dto = modelMapper.map(element, CarModelStatisticDTO.class);
        dto.setUnitCount(element.getCarsOnPurchaseList().stream().mapToInt(value -> value.getCount()).sum());
        return dto;
    }

}
