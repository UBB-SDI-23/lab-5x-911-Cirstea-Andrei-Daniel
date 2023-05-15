package com.example.mpp1.Service;

import com.example.mpp1.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import org.springframework.transaction.PlatformTransactionManager;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.stream.Stream;

@Service
public class SqlService {

    @Autowired
    private UserService user_service;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String ExecuteScript(String script_name) throws Exception {
        if (!user_service.isCurrentUserRole("ROLE_ADMIN")) {
            throw new Exception("Only admins can execute sql scripts. Your current role is " + user_service.getCurrentUser().getRole().getName());
        }

        try {
            long initial_time = System.nanoTime();
            ClassPathResource resource = new ClassPathResource("dbscripts/" + script_name);
            long load_time = System.nanoTime();

            System.out.println("Class path time " + (load_time - initial_time));

            initial_time = load_time;
            String content = resource.getContentAsString(Charset.defaultCharset());
            load_time = System.nanoTime();

            System.out.println("Read content time " + (load_time - initial_time));

            initial_time = load_time;
            jdbcTemplate.execute(content);
            load_time = System.nanoTime();


            System.out.println("Executing time " + (load_time - initial_time));
            return "The command executed successfully without any errors.";
        }
        catch (Exception exception) {
            throw new Exception(exception.getMessage());
        }
    }

}
