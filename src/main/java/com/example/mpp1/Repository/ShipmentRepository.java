package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.Distributor;
import com.example.mpp1.Model.Shipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
//    Page<Shipment> findAllByOrderById(Pageable pageable);
//
//    List<Shipment> findByIdGreaterThanEqual(Long ID);
//
//    int countByUserId(Long userId);
//
//}

@Repository
public interface ShipmentRepository extends BasicRepository<Shipment> {
    List<Shipment> findByIdGreaterThanEqual(Long ID);

}