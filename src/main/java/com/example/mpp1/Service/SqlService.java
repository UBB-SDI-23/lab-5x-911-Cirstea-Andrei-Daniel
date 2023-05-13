package com.example.mpp1.Service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class SqlService {

    public String ExecuteScript(String script_name) throws Exception {
        String command = "/home/andreicfsteaua/lab-5x-911-Cirstea-Andrei-Daniel/execute_sql_script.sh " + script_name;
        Process process = Runtime.getRuntime().exec(command);
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = reader.readLine();
        if (line != null) {
            return line;
        }
        else {
            throw new Exception("Could not read script output");
        }
    }

}
