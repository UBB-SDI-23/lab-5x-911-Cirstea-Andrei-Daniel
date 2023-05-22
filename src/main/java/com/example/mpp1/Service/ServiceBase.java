package com.example.mpp1.Service;

import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.BasicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.Collectors;

public class ServiceBase<R, T extends IModel<R>> {
    private BasicRepository<T> repository;

    private String model_string;

    private UserService user_service;

    public ServiceBase(BasicRepository<T> repository, String model_string, UserService user_service) {
        this.repository = repository;
        this.model_string = model_string;
        this.user_service = user_service;
    }

    public List<R> getAll() {
        return repository.findAll().stream().map(elem -> {
            return ((T)elem).toDTO();
        }).collect(Collectors.toList());
    }

    public Page<R> getPage(Pageable page) {
        return repository.findAllByOrderById(page).map(elem -> {
            return ((T)elem).toDTO();
        });
    }

    public T create(T element) throws Exception {
        element.Validate();
        return (T)repository.save(element);
    }

    public List<T> createList(List<T> elements) {
        elements = elements.stream().filter(element -> {
            try {
                element.Validate();
                return true;
            }
            catch (Exception exception) {
                return false;
            }
        }).toList();

        return repository.saveAll(elements);
    }

    public T findID(Long id) throws Exception {
        return repository.findById(id).orElseThrow(() -> new Exception("The " + model_string + " with id " + id + " doesn't exist"));
    }

    public Integer findCountForUser(Long userID) {
        return repository.countByUserId(userID);
    }

    public T ValidateUserRole(Long elementID, String action_string) throws Exception {
        // Check to see if the request user is the same as the session one
        T element = findID(elementID);
        if (element == null) {
            throw new Exception(model_string + " with id " + elementID + " doesn't exist");
        }
        user_service.ValidateUser(element, "ROLE_REGULAR", action_string + model_string);
        return element;
    }

    public T update(T element, Long id) throws Exception {
        T old_element = ValidateUserRole(id, "update the ");
        User old_user = old_element.getUser();
        old_element = element;
        old_element.setUser(old_user);
        return repository.save(old_element);
    }

    public String delete(Long id) throws Exception {
        ValidateUserRole(id, "delete the ");

        try {
            repository.deleteById(id);
            // Delete operation was successful
        } catch (EmptyResultDataAccessException ex) {
            // Handle case when entity with the specified ID does not exist
            // e.g., return an error response or perform some other action
            return "The selected " + model_string + " does not exist. Exception: " + ex.getMessage();
        } catch (DataAccessException ex) {
            // Handle other data access exceptions
            // e.g., return an error response or perform some other action
            return "The selected " + model_string + " has other dependent entities. Exception: " + ex.getMessage();
        }

        return model_string + " successfully deleted";
    }

}
