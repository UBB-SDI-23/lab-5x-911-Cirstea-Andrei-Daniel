package com.example.mpp1.Service;

import com.example.mpp1.Model.EntriesPerPage;
import com.example.mpp1.Repository.EntriesPerPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntriesPerPageService {

    @Autowired
    private EntriesPerPageRepository repository;

    public Integer getEntriesPerPage() {
        return repository.findAll().get(0).getValue();
    }

    public Integer setEntriesPerPage(Integer value) {
        EntriesPerPage entries = repository.findAll().get(0);
        entries.setValue(value);
        entries = repository.save(entries);
        return entries.getValue();
    }

}
