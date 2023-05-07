package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarsOnPurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarsOnPurchaseRepository extends JpaRepository<CarsOnPurchase, Long> {

    int countByUserId(Long userId);

}
