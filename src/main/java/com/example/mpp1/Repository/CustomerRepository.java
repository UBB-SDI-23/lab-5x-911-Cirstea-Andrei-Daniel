package com.example.mpp1.Repository;

import com.example.mpp1.Model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("select u from Customer u where (:firstName is null or u.firstName LIKE '%:firstName%')"
            + " and (:lastName is null or u.lastName = '%:lastName%')")
    List<Customer> searchByFirstAndOrLastName(@Param("firstName") String firstName,
                                              @Param("lastName") String lastName);


}
