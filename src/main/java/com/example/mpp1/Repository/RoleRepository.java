package com.example.mpp1.Repository;

import com.example.mpp1.Model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<UserRole, Long> {

    UserRole findByName(String name);

}
