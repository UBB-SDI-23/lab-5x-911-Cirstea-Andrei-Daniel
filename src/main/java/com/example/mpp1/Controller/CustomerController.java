package com.example.mpp1.Controller;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.CustomerRepository;
import com.example.mpp1.Service.CarsOnPurchaseService;
import com.example.mpp1.Service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

//@RestController
//@RequestMapping(path = "/api/customers")
//public class CustomerController {
//
//    @Autowired
//    private CustomerService service;
//
//    @GetMapping()
//    public List<CustomerDTO> getAll() {
//        return service.getAll();
//    }
//
//    @GetMapping("/paged")
//    public Page<CustomerDTO> getPage(@RequestParam(defaultValue = "0", required = false) Integer page, @RequestParam(defaultValue = "10", required = false) Integer page_size) {
//        Pageable page_request = PageRequest.of(page, page_size);
//        return service.getPage(page_request);
//    }
//
//    @PostMapping()
//    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
//        return service.createCustomer(customer);
//    }
//
//    @PostMapping("/create")
//    public List<Customer> createCustomers(@RequestBody List<Customer> customers) {
//        return service.createCustomers(customers);
//    }
//
//    @GetMapping("/autocomplete")
//    public List<Customer> searchCustomerByFirstNameAndLastName(@RequestParam("query") String query) {
//        System.out.println(query);
//        return service.filterCustomers(query == null ? "" : query);
//    }
//
//    @GetMapping("/find/{id}")
//    public Customer findID(@PathVariable("id") Long id) {
//        return service.findID(id);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer, @PathVariable("id") Long customerID) {
//        try {
//            return new ResponseEntity<>(service.updateCustomer(customer, customerID), HttpStatus.OK);
//        }
//        catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public String deleteCustomer(@PathVariable("id") Long customerID){
//        return deleteCustomer(customerID);
//    }
//
//}

@RestController
@RequestMapping(path = "/api/customers")
public class CustomerController extends ControllerBase<CustomerDTO, Customer> {

    @Autowired
    public CustomerController(CustomerService service) {
        super(service);
    }

}