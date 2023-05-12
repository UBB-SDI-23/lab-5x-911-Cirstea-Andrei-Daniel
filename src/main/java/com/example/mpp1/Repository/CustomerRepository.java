package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public interface CustomerRepository extends JpaRepository<Customer, Long> {
//
//    Page<Customer> findAllByOrderById(Pageable pageable);
//
//
//
//    int countByUserId(Long userId);
//
//}


@Repository
public interface CustomerRepository extends BasicRepository<Customer> {
    List<Customer> findByFirstNameContainingAndLastNameContaining(String firstName, String lastName, Pageable pageable);
}
