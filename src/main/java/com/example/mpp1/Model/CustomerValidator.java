package com.example.mpp1.Model;

import java.util.Arrays;
import java.util.List;

public class CustomerValidator {

    static public void Validate(Customer element) throws Exception {
        String[] priorities = {
                "Regular",
                "Pro",
                "Premium",
                "VIP"
        };

        List<String> priorityList = Arrays.asList(priorities);
        if (!priorityList.contains(element.getPriority())) {
            throw new Exception("Invalid priority of " + element.getPriority() + " for customer");
        }

    }

}
