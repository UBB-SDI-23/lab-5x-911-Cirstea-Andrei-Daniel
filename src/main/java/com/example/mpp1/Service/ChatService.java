package com.example.mpp1.Service;

import com.example.mpp1.Model.User;
import com.example.mpp1.Model.UserChatMessage;
import com.example.mpp1.Model.UserNickname;
import com.example.mpp1.Repository.UserChatMessageRepository;
import com.example.mpp1.Repository.UserNicknameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private UserNicknameRepository nickname_repository;

    @Autowired
    private UserChatMessageRepository chat_repository;

    // It returns an empty string if the user doesn't have a nickname
    public String getUserNickname(Long userID) {
        User user = new User();
        user.setId(userID);
        try {
            UserNickname nickname = nickname_repository.findByUser(user);
            return nickname.getNickname();
        }
        catch (Exception exception) {
            return "";
        }
    }

    public UserNickname setUserNickname(UserNickname element) {
        return nickname_repository.save(element);
    }

    public UserChatMessage addUserMessage(UserChatMessage element) {
        return chat_repository.save(element);
    }

}
