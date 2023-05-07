package com.example.mpp1.Service;

import com.example.mpp1.Model.ConfirmationCode;
import com.example.mpp1.Model.User;
import com.example.mpp1.Repository.ConfirmationCodeRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ConfirmationCodeService {

    @Autowired
    private ConfirmationCodeRepository confirmation_code_repository;

    public ConfirmationCode generateConfirmationCode(User user) {
        ConfirmationCode code = new ConfirmationCode();
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
                    confirmation_code_repository.delete(existing_code);
                }
            }
        }

        return confirmation_code_repository.save(code);
    }

    public String validateConfirmationCode(String value) {
        ConfirmationCode existing_code = confirmation_code_repository.findByValue(value);
        if (existing_code == null) {
            return "The code is invalid";
        }

        Date current_date = new Date();
        long diffInMilliseconds = current_date.getTime() - existing_code.getCreationDate().getTime();
        long diffInMinutes = diffInMilliseconds / (60 * 1000);

        confirmation_code_repository.delete(existing_code);

        if (diffInMinutes < 10) {
            return null;
        }

        return "The code has expired";
    }

}
