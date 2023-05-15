package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    List<Purchase> findAllByStatusEqualsOrderById(String status);

    Page<Purchase> findAllByStatusEqualsOrderById(String status, Pageable pageable);

    Long countByStatus(String status);

    List<Purchase> findBy(String date, Pageable pageable);

    @Query("SELECT p FROM Purchase p JOIN p.original_customer c WHERE c.firstName LIKE %:filter_string% OR c.lastName LIKE %:filter_string%")
    Page<Purchase> findByCustomerName(@Param("filter_string") String filterString, Pageable pageable);
}