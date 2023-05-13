package com.example.mpp1.Controller;

import com.example.mpp1.Service.SqlService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/sql")
public class SqlController {

    @Autowired
    private SqlService service;

    @PostMapping("/{script_name}")
    public ResponseEntity<?> execute(@PathVariable("script_name") String script_name) {
        try {
            return new ResponseEntity<>(service.ExecuteScript(script_name), HttpStatus.OK);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
