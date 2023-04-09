package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.Customer;
import com.example.mpp1.Model.CustomerDTO;
import com.example.mpp1.Model.PurchaseDTO;
import com.example.mpp1.Repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public List<CustomerDTO> getAll() {
        return repository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping()
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        if (customer.getLastName() == null || customer.getLastName().equals("")) {
            return new ResponseEntity<>("Customer last name invalid", HttpStatus.BAD_REQUEST);
        }
        else if (customer.getFirstName() == null || customer.getFirstName().equals("")) {
            return new ResponseEntity<>("Customer first name invalid", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Customer>(repository.save(customer), HttpStatus.OK);
    }

    @PostMapping("/create")
    public List<Customer> createCustomers(@RequestBody List<Customer> customers) {
        return repository.saveAll(customers);
    }

    @GetMapping("/{id}")
    public Customer findID(@PathVariable("id") Long carID) {
        return repository.findById(carID).get();
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@RequestBody Customer customer, @PathVariable("id") Long customerID){
        Customer old_customer = findID(customerID);
        old_customer = customer;
        return repository.save(old_customer);
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable("id") Long customerID){
        repository.deleteById(customerID);
        return "Customer successfully deleted";
    }

    private CustomerDTO convertToDto(Customer element) {
        return modelMapper.map(element, CustomerDTO.class);
    }

}
