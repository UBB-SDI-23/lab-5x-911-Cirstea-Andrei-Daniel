package com.example.mpp1.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mpp1.Model.CarModel;
import org.springframework.stereotype.Repository;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {

}
