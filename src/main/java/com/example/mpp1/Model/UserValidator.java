package com.example.mpp1.Model;

import java.util.Date;
import java.util.function.IntPredicate;

public class UserValidator {

    static private boolean contains(String value, IntPredicate predicate) {
        return value.chars().anyMatch(predicate);
    }

    static private boolean isPasswordValid(String value) {
        return containsLowerCase(value) &&
                containsUpperCase(value) &&
                containsNumber(value);
    }

    static private boolean containsLowerCase(String value) {
        return contains(value, i -> Character.isLetter(i) && Character.isLowerCase(i));
    }

    static private boolean containsUpperCase(String value) {
        return contains(value, i -> Character.isLetter(i) && Character.isUpperCase(i));
    }

    static private boolean containsNumber(String value) {
        return contains(value, Character::isDigit);
    }

    static public void Validate(User user) throws Exception {
        String password = user.getPassword();

        boolean is_valid = isPasswordValid(password);
        if (!is_valid) {
            throw new Exception("Invalid password: " + password);
        }
    }
}
