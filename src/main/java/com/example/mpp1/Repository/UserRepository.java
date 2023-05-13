package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByOrderById();

    Page<User> findAllByOrderById(Pageable page);

    User findByUsername(String username);

}
