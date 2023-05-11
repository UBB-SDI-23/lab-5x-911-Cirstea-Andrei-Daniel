package com.example.mpp1.Model;

import java.util.Arrays;
import java.util.List;

public class PurchaseValidator {

    static public void Validate(Purchase element) throws Exception {
        String[] statuses = {
                "Completed",
                "Pending",
                "Failed"
        };

        String[] pays = {
                "CreditCard",
                "PayPal",
                "Cash",
                "DebitCard",
                "BankTransfer"
        };

        List<String> status_list = Arrays.asList(statuses);
        if (!status_list.contains(element.getStatus())) {
            throw new Exception("Invalid status of " + element.getStatus() + " for purchase");
        }

        List<String> pay_list = Arrays.asList(pays);
        if (!pay_list.contains(element.getPayMethod())) {
            throw new Exception("Invalid pay method of " + element.getPayMethod() + " for purchase");
        }

    }

}
