package com.example.mpp1.Service;

import com.example.mpp1.Model.CarsOnPurchase;
import com.example.mpp1.Model.CarsOnPurchaseDTO;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.CustomerDTO;
import com.example.mpp1.Repository.CarsOnPurchaseRepository;
import com.example.mpp1.Repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

//@Service
//public class CustomerService {
//
//    @Autowired
//    private CustomerRepository repository;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @Autowired
//    private UserService user_service;
//
//    public List<CustomerDTO> getAll() {
//        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
//    }
//
//    public Page<CustomerDTO> getPage(Pageable page) {
//        //return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
//        return repository.findAllByOrderById(page).map(this::convertToDto);
//    }
//
//    public ResponseEntity<?> createCustomer(Customer customer) {
//        if (customer.getLastName() == null || customer.getLastName().equals("")) {
//            return new ResponseEntity<>("Customer last name invalid", HttpStatus.BAD_REQUEST);
//        }
//        else if (customer.getFirstName() == null || customer.getFirstName().equals("")) {
//            return new ResponseEntity<>("Customer first name invalid", HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<Customer>(repository.save(customer), HttpStatus.OK);
//    }
//
//    public List<Customer> createCustomers(List<Customer> customers) {
//        return repository.saveAll(customers);
//    }
//
//    // Filter string is a combination of first_name + last_name
//    public List<Customer> filterCustomers(String filter_string) {
//        String[] parts = filter_string.split(" ");
//        Pageable page_request = PageRequest.of(0, 20);
//        if (parts.length == 1) {
//            return repository.findByFirstNameContainingAndLastNameContaining(parts[0], "", page_request);
//        }
//        else {
//            return repository.findByFirstNameContainingAndLastNameContaining(parts[0], parts[1], page_request);
//        }
//    }
//
//    public Customer findID(Long carID) {
//        return repository.findById(carID).get();
//    }
//
//    public Integer findCountForUser(Long userID) {
//        return repository.countByUserId(userID);
//    }
//
//    public Customer ValidateUserRole(Long elementID) throws Exception {
//        // Check to see if the request user is the same as the session one
//        Customer element = findID(elementID);
//        if (element == null) {
//            throw new Exception("Customer with id " + elementID + " doesn't exist");
//        }
//        user_service.ValidateUser(element, "ROLE_REGULAR");
//        return element;
//    }
//
//    public Customer updateCustomer(Customer customer, Long customerID) throws Exception {
//        Customer old_customer = ValidateUserRole(customerID);
//        old_customer = customer;
//        return repository.save(old_customer);
//    }
//
//    public String deleteCustomer(Long customerID) throws Exception {
//        ValidateUserRole(customerID);
//        repository.deleteById(customerID);
//        return "Customer successfully deleted";
//    }
//
//    private CustomerDTO convertToDto(Customer element) {
//        CustomerDTO dto = modelMapper.map(element, CustomerDTO.class);
//        dto.setPurchaseCount(element.getPurchases().size());
//        return dto;
//    }
//
//}

@Service
public class CustomerService extends ServiceBase<CustomerDTO, Customer> {

    private final CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository, UserService user_service) {
        super(repository, "Car Model", user_service);
        this.repository = repository;
    }

    public List<Customer> filterCustomers(String filter_string) {
        String[] parts = filter_string.split(" ");
        Pageable page_request = PageRequest.of(0, 20);
        if (parts.length == 1) {
            return repository.findByFirstNameContainingAndLastNameContaining(parts[0], "", page_request);
        }
        else {
            return repository.findByFirstNameContainingAndLastNameContaining(parts[0], parts[1], page_request);
        }
    }

}

