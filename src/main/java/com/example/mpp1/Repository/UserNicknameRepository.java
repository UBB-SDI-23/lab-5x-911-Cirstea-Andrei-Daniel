package com.example.mpp1.Repository;

import com.example.mpp1.Model.User;
import com.example.mpp1.Model.UserNickname;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserNicknameRepository extends JpaRepository<UserNickname, Long>  {

    public UserNickname findByUser(User user);

}
