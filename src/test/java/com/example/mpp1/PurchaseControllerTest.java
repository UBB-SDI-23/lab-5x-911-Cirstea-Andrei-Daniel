package com.example.mpp1;

import com.example.mpp1.Controller.PurchaseController;
import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.Purchase;
import com.example.mpp1.Model.PurchaseStatisticDTO;
import com.example.mpp1.Repository.PurchaseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PurchaseControllerTest {

    @Mock
    private PurchaseRepository repository;

    @InjectMocks
    private PurchaseController controller;

    @Test
    void testGetAllSortedByPriceWhichAppearInCountPurchases() {
        Customer customer1 = new Customer();
        customer1.setId(1L);
        customer1.setFirstName("John");
        customer1.setLastName("Doe");
        customer1.setTelephone_number("+1 123-456-7890");
        customer1.setEmail_address("john.doe@example.com");
        customer1.setPriority("Low");

        Customer customer2 = new Customer();
        customer2.setId(2L);
        customer2.setFirstName("Jane");
        customer2.setLastName("Doe");
        customer2.setTelephone_number("+1 987-654-3210");
        customer2.setEmail_address("jane.doe@example.com");
        customer2.setPriority("High");

        Customer customer3 = new Customer();
        customer3.setId(3L);
        customer3.setFirstName("Acme Inc.");
        customer3.setLastName("");
        customer3.setTelephone_number("+1 555-555-5555");
        customer3.setEmail_address("sales@acmeinc.com");
        customer3.setPriority("Average");

        Customer customer4 = new Customer();
        customer4.setId(4L);
        customer4.setFirstName("Smith Ltd.");
        customer4.setLastName("");
        customer4.setTelephone_number("+1 555-555-5555");
        customer4.setEmail_address("sales@smithltd.com");
        customer4.setPriority("Average");

        Customer customer5 = new Customer();
        customer5.setId(5L);
        customer5.setFirstName("Bill");
        customer5.setLastName("Johnson");
        customer5.setTelephone_number("+1 555-555-5555");
        customer5.setEmail_address("bill.johnson@example.com");
        customer5.setPriority("Low");

        List<Customer> customers = new ArrayList<Customer>();
        customers.add(customer1);
        customers.add(customer2);
        customers.add(customer3);
        customers.add(customer4);
        customers.add(customer5);

        ModelMapper modelMapper = new ModelMapper();

        Purchase purchase1 = new Purchase();
        purchase1.setId(1L);
        purchase1.setDate(new Date());
        purchase1.setPayMethod("Credit Card");
        purchase1.setStatus("Completed");
        purchase1.setOriginal_customer(customer1);

        Purchase purchase2 = new Purchase();
        purchase2.setId(2L);
        purchase2.setDate(new Date());
        purchase2.setPayMethod("PayPal");
        purchase2.setStatus("Pending");
        purchase2.setOriginal_customer(customer2);

        Purchase purchase3 = new Purchase();
        purchase3.setId(3L);
        purchase3.setDate(new Date());
        purchase3.setPayMethod("Cash");
        purchase3.setStatus("Completed");
        purchase3.setOriginal_customer(customer3);

        Purchase purchase4 = new Purchase();
        purchase4.setId(4L);
        purchase4.setDate(new Date());
        purchase4.setPayMethod("Credit Card");
        purchase4.setStatus("Canceled");
        purchase4.setOriginal_customer(customer4);

        Purchase purchase5 = new Purchase();
        purchase5.setId(5L);
        purchase5.setDate(new Date());
        purchase5.setPayMethod("Credit Card");
        purchase5.setStatus("Completed");
        purchase5.setOriginal_customer(customer5);

        List<Purchase> purchases = new ArrayList<Purchase>();
        purchases.add(purchase1);
        purchases.add(purchase2);
        purchases.add(purchase3);
        purchases.add(purchase4);
        purchases.add(purchase5);

        List<PurchaseStatisticDTO> statisticDTO = new ArrayList<PurchaseStatisticDTO>();

        CarsOnPurchase mock_cars_on_purchase = new CarsOnPurchase();
        int count = 5;
        for (int index = 0; index < count; index++) {
            purchases.get(index).setCarsOnPurchaseList(new ArrayList<CarsOnPurchase>());
            mock_cars_on_purchase.setCount(index + 1);
            purchases.get(index).getCarsOnPurchaseList().add(mock_cars_on_purchase);
            mock_cars_on_purchase = new CarsOnPurchase();

            statisticDTO.add(modelMapper.map(purchases.get(index), PurchaseStatisticDTO.class));
            statisticDTO.get(index).setCarsPurchased(index + 1);
        }

        List<Purchase> completed_purchases = new ArrayList<Purchase>();
        completed_purchases.add(purchases.get(0));
        completed_purchases.add(purchases.get(2));
        completed_purchases.add(purchases.get(4));

        List<Purchase> canceled_purchases = new ArrayList<Purchase>();
        canceled_purchases.add(purchases.get(3));

        List<Purchase> pending_purchases = new ArrayList<Purchase>();
        pending_purchases.add(purchases.get(1));

        when(repository.findAllByStatusEquals("Completed")).thenReturn(completed_purchases);
        when(repository.findAllByStatusEquals("Pending")).thenReturn(pending_purchases);
        when(repository.findAllByStatusEquals("Canceled")).thenReturn(canceled_purchases);
//        assertThat(controller.purchasesWithStatusWithCountGreater("Completed", 1L)).hasSize(3);
//        assertThat(controller.purchasesWithStatusWithCountGreater("Completed", 2L)).hasSize(2);
//        assertThat(controller.purchasesWithStatusWithCountGreater("Completed", 4L)).hasSize(1);
//        assertThat(controller.purchasesWithStatusWithCountGreater("Completed", 6L)).hasSize(0);
//
//        assertThat(controller.purchasesWithStatusWithCountGreater("Canceled", 3L)).hasSize(1)
//                .hasSize(1).first().usingRecursiveComparison().isEqualTo(statisticDTO.get(3));
//        assertThat(controller.purchasesWithStatusWithCountGreater("Canceled", 4L))
//                .hasSize(1).first().usingRecursiveComparison().isEqualTo(statisticDTO.get(3));
//
//        assertThat(controller.purchasesWithStatusWithCountGreater("Pending", 4L))
//                .hasSize(0);
    }

}
