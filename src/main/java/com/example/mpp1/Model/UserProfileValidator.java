package com.example.mpp1.Model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class UserProfileValidator {

    static private boolean isValidDate(Date date) {
        String dateFormat = "yyyy-MM-dd"; // set your desired date format
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        sdf.setLenient(false); // set lenient to false to validate the date strictly

        try {
            sdf.parse(sdf.format(date)); // format the date and parse it to validate
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    static public boolean Validate(UserProfile profile) {
        String gender = profile.getGender();

        if (!gender.contentEquals("Male") || !gender.contentEquals("Female")) {
            return false;
        }

        Date birthday = profile.getBirthday();
        if (!isValidDate(birthday)) {
            return false;
        }

        String description = profile.getDescription();
        if (description.length() > 250) {
            return false;
        }

        return true;
    }

}
