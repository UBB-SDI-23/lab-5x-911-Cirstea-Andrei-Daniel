package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.CarsOnPurchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
//public interface CarsOnPurchaseRepository extends JpaRepository<CarsOnPurchase, Long> {
//
//    Page<CarsOnPurchase> findAllByOrderById(Pageable pageable);
//
//    int countByUserId(Long userId);
//
//}

@Repository
public interface CarsOnPurchaseRepository extends BasicRepository<CarsOnPurchase> {

}

