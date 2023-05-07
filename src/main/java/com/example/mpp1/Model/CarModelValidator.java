package com.example.mpp1.Model;

public class CarModelValidator {

    static public boolean validate(CarModel carModel) {
        if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
                || carModel.getManufacturer().equals("")) {
            return false;
        }

        return true;
    }

}
