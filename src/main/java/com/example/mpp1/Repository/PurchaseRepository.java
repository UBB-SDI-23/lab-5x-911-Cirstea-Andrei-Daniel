package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
//
//    Page<Purchase> findAllByOrderById(Pageable pageable);
//
//    List<Purchase> findAllByStatusEquals(String status);
//
//    Page<Purchase> findAllByStatusEquals(String status, Pageable pageable);
//
//    Long countByStatus(String status);
//
//    int countByUserId(Long userId);
//
//}

@Repository
public interface PurchaseRepository extends BasicRepository<Purchase> {
    List<Purchase> findAllByStatusEquals(String status);

    Page<Purchase> findAllByStatusEquals(String status, Pageable pageable);

    Long countByStatus(String status);
}