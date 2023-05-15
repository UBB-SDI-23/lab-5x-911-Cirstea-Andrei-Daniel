package com.example.mpp1.Repository;

import com.example.mpp1.Model.*;
import jakarta.persistence.*;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//interface CarModelRepositoryImpl implements JpaRepository<CarModel, Long> {
//
//    Page<CarModel> findAllByOrderById(Pageable pageable);
//
//    int countByUserId(Long userId);
//
//}

@Repository
public interface CarModelRepository extends BasicRepository<CarModel> {

    Page<CarModel> findByModelContainingIgnoreCaseOrManufacturerContainsIgnoreCase(String model, String manufacturer, Pageable pageable);

}
