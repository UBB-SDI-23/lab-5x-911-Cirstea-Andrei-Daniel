package com.example.mpp1.Model;

public class CarModelValidator {

    static public void Validate(CarModel carModel) throws Exception {
        if (carModel.getModel() == null || carModel.getManufacturer() == null || carModel.getModel().equals("")
                || carModel.getManufacturer().equals("")) {
            throw new Exception("Invalid car model");
        }
    }

}
