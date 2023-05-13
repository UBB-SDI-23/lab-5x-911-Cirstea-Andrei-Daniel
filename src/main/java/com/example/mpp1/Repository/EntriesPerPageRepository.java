package com.example.mpp1.Repository;

import com.example.mpp1.Model.EntriesPerPage;
import com.example.mpp1.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntriesPerPageRepository extends JpaRepository<EntriesPerPage, Long> {
}
