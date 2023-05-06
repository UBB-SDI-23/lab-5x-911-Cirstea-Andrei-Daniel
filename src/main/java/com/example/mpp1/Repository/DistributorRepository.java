package com.example.mpp1.Repository;

import com.example.mpp1.Model.Distributor;
import com.example.mpp1.Model.DistributorStatisticDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistributorRepository extends JpaRepository<Distributor, Long> {


}
