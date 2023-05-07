package com.example.mpp1.Repository;

import com.example.mpp1.Model.ConfirmationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationCodeRepository extends JpaRepository<ConfirmationCode, Long> {
    ConfirmationCode findByValue(String value);
}
