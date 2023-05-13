package com.example.mpp1.Controller;

import com.example.mpp1.Model.EntriesPerPage;
import com.example.mpp1.Service.EntriesPerPageService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/entries_per_page")
public class EntriesPerPageController {

    @Autowired
    private EntriesPerPageService service;

    @GetMapping()
    public Integer get() {
        return service.getEntriesPerPage();
    }

    @RolesAllowed({"ROLE_ADMIN"})
    @PostMapping("/{value}")
    public Integer set(@PathVariable("value") Integer value) {
        return service.setEntriesPerPage(value);
    }

}
