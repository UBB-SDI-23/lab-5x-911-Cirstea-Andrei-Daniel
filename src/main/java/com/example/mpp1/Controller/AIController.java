package com.example.mpp1.Controller;

import com.example.mpp1.Service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/ai")
public class AIController {

    @Autowired
    private AIService service;

    @GetMapping("/{country}")
    private ResponseEntity<?> predict(@PathVariable("country") String country) {
        try {
            return new ResponseEntity<>(service.MakePrediction(country), HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
