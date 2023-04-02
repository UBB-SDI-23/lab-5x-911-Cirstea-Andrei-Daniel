package com.example.mpp1.Repository;

import com.example.mpp1.Model.Distributor;
import com.example.mpp1.Model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByIdGreaterThanEqual(Long ID);
}
