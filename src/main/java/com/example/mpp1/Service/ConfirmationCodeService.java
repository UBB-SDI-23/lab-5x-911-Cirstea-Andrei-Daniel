package com.example.mpp1.Service;

import com.example.mpp1.Jwt.UserAuthenticationProvider;
import com.example.mpp1.Model.ConfirmationCode;
import com.example.mpp1.Model.User;
import com.example.mpp1.Repository.ConfirmationCodeRepository;
import com.example.mpp1.Repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ConfirmationCodeService {

    @Autowired
    private ConfirmationCodeRepository confirmation_code_repository;

    @Autowired
    private UserService user_service;

    public ConfirmationCode generateConfirmationCode(User user) throws Exception {
        ConfirmationCode code = new ConfirmationCode();
        user.setIsEnabled(false);
        code.setUser(user);

        while (true) {
            String random_string = RandomStringUtils.random(8, true, true);
            ConfirmationCode existing_code = confirmation_code_repository.findByValue(random_string);
            if (existing_code == null) {
                code.setValue(random_string);
                code.setCreationDate(new Date());
                break;
            }
            else {
                // Delete the code if it has expired
                Date current_date = new Date();
                long diffInMilliseconds = current_date.getTime() - existing_code.getCreationDate().getTime();
                long diffInMinutes = diffInMilliseconds / (60 * 1000);
                if (diffInMinutes >= 10) {
                    user_service.deleteUser(existing_code.getUser().getId());
                    confirmation_code_repository.delete(existing_code);
                }
            }
        }

        user_service.register(code.getUser());
        return confirmation_code_repository.save(code);
    }

    public User validateConfirmationCode(String value) throws Exception {
        ConfirmationCode existing_code = confirmation_code_repository.findByValue(value);
        if (existing_code == null) {
            throw new Exception("The code is invalid");
        }

        Date current_date = new Date();
        long diffInMilliseconds = current_date.getTime() - existing_code.getCreationDate().getTime();
        long diffInMinutes = diffInMilliseconds / (60 * 1000);

        User user = existing_code.getUser();
        user = user.deepCopy();
        confirmation_code_repository.delete(existing_code);

        if (diffInMinutes < 10) {
            user_service.enableUser(user.getId());
            return user;
        }

        user_service.deleteUser(user.getId());
        throw new Exception("The code has expired");
    }

}
