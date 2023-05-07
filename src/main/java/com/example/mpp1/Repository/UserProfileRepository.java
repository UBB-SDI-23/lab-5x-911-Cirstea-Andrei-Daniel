package com.example.mpp1.Repository;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    UserProfile findByUserId(@Param("userID") Long userId);

}
