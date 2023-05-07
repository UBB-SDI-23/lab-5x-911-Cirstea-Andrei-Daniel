package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.CarModelRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
import org.springframework.data.annotation.Persistent;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//class TempClass {
//    private Long id;
//    private Long unitCount;
//}

@Service
public class CarModelService {
    @Autowired
    private CarModelRepository repository;

//    @PersistenceContext
//    private EntityManager entityManager;
//
//    public Page<CarModelStatisticDTO> getCarModelsWithPurchaseCount(Pageable pageable) {
////        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
////        CriteriaQuery<CarModelStatisticDTO> query = builder.createQuery(CarModelStatisticDTO.class);
////        Root<CarModel> carModelRoot = query.from(CarModel.class);
////        Join<CarModel, CarsOnPurchase> carModelCarsOnPurchaseJoin = carModelRoot.join("carsOnPurchaseList", JoinType.LEFT);
////
////        query.multiselect(
////                        carModelRoot.get("id"),
////                        carModelRoot.get("model"),
////                        carModelRoot.get("manufacturer"),
////                        carModelRoot.get("price"),
////                        carModelRoot.get("manufacture_year"),
////                        carModelRoot.get("fuel_consumption"),
////                        builder.coalesce(builder.sum(carModelCarsOnPurchaseJoin.get("count")), 0).alias("unitCount")
////                ).groupBy(carModelRoot.get("id"))
////                .orderBy(builder.desc(builder.coalesce(builder.sum(carModelCarsOnPurchaseJoin.get("count")), 0)));
////
////        TypedQuery<CarModelStatisticDTO> typedQuery = entityManager.createQuery(query);
////
////        System.out.println(pageable.getPageNumber() * pageable.getPageSize());
////        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
////        typedQuery.setMaxResults(pageable.getPageSize());
////
////        List<CarModelStatisticDTO> resultList = typedQuery.getResultList();
//
////        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
////        CriteriaQuery<TempClass> query = builder.createQuery(TempClass.class);
////
////        Root<CarModel> carModelRoot = query.from(CarModel.class);
////        Subquery<Long> subquery = query.subquery(Long.class);
////        Root<CarsOnPurchase> carsOnPurchaseRoot = subquery.from(CarsOnPurchase.class);
////        subquery.select(builder.coalesce(builder.sum(carsOnPurchaseRoot.get("count")), 0L))
////                .where(builder.equal(carsOnPurchaseRoot.get("carModel"), carModelRoot));
////        query.select(builder.construct(
////                        TempClass.class,
////                        carModelRoot.get("id").alias("id"),
////                        builder.coalesce(subquery, 0L).alias("unitCount")))
////                .orderBy(builder.desc(builder.coalesce(subquery, 0L)));
////        List<TempClass> tempClassList = entityManager.createQuery(query)
////                .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
////                .setMaxResults(pageable.getPageSize())
////                .getResultList();
////
////        CriteriaQuery<CarModel> car_model_query = builder.createQuery(CarModel.class);
////        carModelRoot = car_model_query.from(CarModel.class);
//
//        //TypedQuery<TempClass> typedQuery = entityManager.createQuery(query);
//
//// Set pagination
//        //typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
//        //typedQuery.setMaxResults(pageable.getPageSize());
//
//        //List<TempClass> tempClassList = typedQuery.getResultList();
//
//        car_model_query.select(
//                builder.construct(CarModel.class,
//                    carModelRoot.get("id"),
//                    carModelRoot.get("model"),
//                    carModelRoot.get("manufacturer"),
//                    carModelRoot.get("manufacture_year"),
//                    carModelRoot.get("price"),
//                    carModelRoot.get("fuel_consumption"),
//                        carModelRoot.get("description")
//                )
//        ).where(carModelRoot.get("id").in(tempClassList.stream().map(elem -> elem.getId()).toList()));
//
//        List<CarModel> car_models = entityManager.createQuery(car_model_query).getResultList();
//
//        List<CarModelStatisticDTO> resultList = car_models.stream().map(car_model -> new CarModelStatisticDTO(
//                car_model.getId(),
//                car_model.getModel(),
//                car_model.getManufacturer(),
//                car_model.getPrice(),
//                car_model.getManufacture_year(),
//                car_model.getFuel_consumption(),
//                (Integer)tempClassList.stream().filter(element -> element.getId() == car_model.getId()).findAny().get().getUnitCount().intValue()
//        )).collect(Collectors.toList());
//        resultList.sort((elem1, elem2) -> { return elem1.getUnitCount() < elem2.getUnitCount() ? 1 : -1; });
//
//        return new PageImpl<>(resultList, pageable, resultList.size());
//    }

    private ModelMapper modelMapper = new ModelMapper();

    public List<CarModelDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Page<CarModelDTO> getPage(Pageable page) {
        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
        return repository.findAll(page).map(this::convertToDto);
    }

    public ResponseEntity<?> createCarModel(CarModel carModel) {
        if (CarModelValidator.validate(carModel)) {
            return new ResponseEntity<>("Invalid car model", HttpStatus.BAD_REQUEST);
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

    public Integer findCountForUser(Long userID) {
        return repository.countByUserId(userID);
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
