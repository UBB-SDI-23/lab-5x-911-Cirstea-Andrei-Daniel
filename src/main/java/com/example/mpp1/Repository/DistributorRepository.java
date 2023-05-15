package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.Distributor;
import com.example.mpp1.Model.DistributorStatisticDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public interface DistributorRepository extends JpaRepository<Distributor, Long> {
//
//    Page<Distributor> findAllByOrderById(Pageable pageable);
//
//    int countByUserId(Long userId);
//
//}

@Repository
public interface DistributorRepository extends BasicRepository<Distributor> {

    List<Distributor> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
