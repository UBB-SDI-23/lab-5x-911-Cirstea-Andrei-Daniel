package com.example.mpp1.Repository;

import com.example.mpp1.Model.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

//    @Query("select u from Customer u where u.firstName LIKE CONCAT('%',:firstName,'%') AND u.lastName LIKE CONCAT('%', :lastName, '%') LIMIT 20")
//    List<Customer> searchByFirstAndOrLastName(@Param("firstName") String firstName,
//                                              @Param("lastName") String lastName);

    List<Customer> findByFirstNameContainingAndLastNameContaining(String firstName, String lastName, Pageable pageable);


}
