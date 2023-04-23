package com.example.mpp1.Service;

import com.example.mpp1.Model.CarsOnPurchaseDTO;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.CustomerDTO;
import com.example.mpp1.Repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public List<CustomerDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<CustomerDTO> getPage(Pageable page) {
        return repository.findAll(page).stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Long getEntityCount() {
        return repository.count();
    }

    public ResponseEntity<?> createCustomer(Customer customer) {
        if (customer.getLastName() == null || customer.getLastName().equals("")) {
            return new ResponseEntity<>("Customer last name invalid", HttpStatus.BAD_REQUEST);
        }
        else if (customer.getFirstName() == null || customer.getFirstName().equals("")) {
            return new ResponseEntity<>("Customer first name invalid", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Customer>(repository.save(customer), HttpStatus.OK);
    }

    public List<Customer> createCustomers(List<Customer> customers) {
        return repository.saveAll(customers);
    }

    // Filter string is a combination of first_name + last_name
    public List<Customer> filterCustomers(String filter_string) {
        String[] parts = filter_string.split(" ");
        if (parts.length == 1) {
            return repository.searchByFirstAndOrLastName(parts[0], "");
        }
        else {
            return repository.searchByFirstAndOrLastName(parts[0], parts[1]);
        }
    }

    public Customer findID(Long carID) {
        return repository.findById(carID).get();
    }

    public Customer updateCustomer(Customer customer, Long customerID){
        Customer old_customer = findID(customerID);
        old_customer = customer;
        return repository.save(old_customer);
    }

    public String deleteCustomer(Long customerID){
        repository.deleteById(customerID);
        return "Customer successfully deleted";
    }

    private CustomerDTO convertToDto(Customer element) {
        CustomerDTO dto = modelMapper.map(element, CustomerDTO.class);
        dto.setPurchaseCount(element.getPurchases().size());
        return dto;
    }

}
