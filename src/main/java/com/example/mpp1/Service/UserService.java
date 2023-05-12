package com.example.mpp1.Service;


import com.example.mpp1.Jwt.JwtRequest;
import com.example.mpp1.Jwt.UserAuthenticationProvider;
import com.example.mpp1.Model.*;
import com.example.mpp1.Repository.UserProfileRepository;
import com.example.mpp1.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository user_repository;

    @Autowired
    private UserProfileRepository user_profile_repository;

    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUsers() {
        return user_repository.findAll();
    }

    public User enableUser(Long userID) throws Exception {
        Optional<User> value = user_repository.findById(userID);
        if (!value.isPresent()) {
            throw new Exception("Invalid user id when trying to enable");
        }

        User user = value.get();
        user.setEnabled(true);
        return user_repository.save(user);
    }

    public User login(JwtRequest request) throws Exception {
        User user = user_repository.findByUsername(request.getUsername());

        if (user == null) {
            throw new Exception("The username " + request.getUsername() + " doesn't exist");
        }

        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return user;
        }
        throw new Exception("Invalid password for username " + request.getUsername());
    }

    public User register(User user) throws Exception {
        if (user.getEnabled() == null) {
            user.setEnabled(false);
        }
        UserValidator.Validate(user);

        User existing_user = user_repository.findByUsername(user.getUsername());

        if (existing_user != null) {
            throw new Exception("The username " + user.getUsername() + " already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserProfile profile = new UserProfile();
        user = user_repository.save(user);
        profile.setUser(user);
        user_profile_repository.save(profile);
        return user;
    }

    public User findID(Long userID) {
        return user_repository.findById(userID).get();
    }

    public User findByUsername(String username) {
        return user_repository.findByUsername(username);
    }

    public UserProfile findUserProfile(Long userID) {
        return user_profile_repository.findByUserId(userID);
    }

    public void ValidateUser(IWithUser with_user, String role) throws Exception {
        // Check to see if the request user is the same as the session one
        User session_user = getCurrentUser();

        if (!with_user.getUser().getId().equals(session_user.getId())) {
            // Check to see if their role is only ROLE_REGULAR
            UserRole userRole = session_user.getRole();
            if (userRole.getName().compareTo(role) == 0) {
                throw new Exception("Cannot update the car model of user " + with_user.getUser().getId() + " while having role " + role);
            }
        }
    }

    public String deleteUser(Long userID){
        User user = user_repository.findById(userID).get();
        user_profile_repository.deleteByUser(user);
        user_repository.deleteById(userID);
        return "User successfully deleted";
    }

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            UserDetails user_details = (UserDetails)principal;
            return findByUsername(user_details.getUsername());
        }
        return null;
    }

}
