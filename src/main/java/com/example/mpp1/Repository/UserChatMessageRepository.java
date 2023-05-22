package com.example.mpp1.Repository;

import com.example.mpp1.Model.UserChatMessage;
import org.hibernate.annotations.CompositeTypeRegistrations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserChatMessageRepository extends JpaRepository<UserChatMessage, Long> {

}
