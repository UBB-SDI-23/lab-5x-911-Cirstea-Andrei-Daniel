package com.example.mpp1.Model;

import java.util.Arrays;
import java.util.List;

public class DistributorValidator {

        static public void Validate(Distributor element) throws Exception {
            String[] categories = {
                    "NewCars",
                    "OldCars",
                    "RenovatedCars"
            };

            List<String> priorityList = Arrays.asList(categories);
            if (!priorityList.contains(element.getCategory())) {
                throw new Exception("Invalid category of " + element.getCategory() + " for distributor");
            }
        }

}
