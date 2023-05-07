package com.example.mpp1.Controller;

import com.example.mpp1.Model.CarModel;
import com.example.mpp1.Model.User;
import com.example.mpp1.Repository.ConfirmationCodeRepository;
import com.example.mpp1.Service.ConfirmationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/register")
public class ConfirmationCodeController {

    @Autowired
    private ConfirmationCodeService service;

    @GetMapping()
    public String generateConfirmationCode(@RequestBody User user) {
        return service.generateConfirmationCode(user).getValue();
    }

    @GetMapping("/confirm/{code}")
    public String confirmCode(@PathVariable("code") String code) {
        return service.validateConfirmationCode(code);
    }

}
