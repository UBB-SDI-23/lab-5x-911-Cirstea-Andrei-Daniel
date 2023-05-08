package com.example.mpp1.Model;

public class CarsOnPurchaseValidator {

    static public void Validate(CarsOnPurchase element) throws Exception {
        if (element.getPriority() > 10) {
            throw new Exception("Invalid priority of " + element.getPriority() + " for Car Order");
        }

        if (element.getCount() > 10) {
            throw new Exception("Invalid count of " + element.getCount() + " for Car Order");
        }
    }

}
