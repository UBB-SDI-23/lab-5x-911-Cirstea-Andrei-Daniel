package com.example.mpp1.Service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class SqlService {

    public String ExecuteScript(String script_name) throws Exception {
        // Specify the root directory path
        String rootPath = "dbscripts";

        System.out.println("Dbscripts folders");
        try (Stream<Path> paths = Files.walk(Paths.get(rootPath))) {
            paths.forEach(System.out::println);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //String command = "/bin/bash dbscripts/execute_sql_script.sh " + script_name;
        String command = "ls dbscripts";
        Process process = Runtime.getRuntime().exec(command);
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = reader.readLine();
        String last_line = line;
        while (line != null) {
            System.out.println(line);
            last_line = line;
            line = reader.readLine();
        }
        if (last_line != null) {
            String command_success = last_line;
            System.out.println("Last line is " + last_line);
            if (command_success.contentEquals("Success")) {
                // Verify the log file
                try {
                    BufferedReader br = new BufferedReader(new FileReader("dbscripts/logname.txt"));
                    while ((line = br.readLine()) != null) {
                        if (!line.contentEquals("INSERT 0 1000") && !line.contentEquals("ALTER SEQUENCE")
                            && !line.startsWith("DELETE")) {
                            System.out.println("Problematic sql line: " + line);
                            command_success = "The command executed but it has encountered errors.";
                            break;
                        }
                    }
                    br.close();
                }
                catch (IOException exception) {
                    command_success = "The command executed successfully but could not read the log file. Reason: " + exception.getMessage();
                }

                if (command_success.contentEquals("Success")) {
                    command_success = "The command executed successfully without any errors.";
                }
            }
            else {
                command_success = "The command failed to execute.";
            }
            return command_success;
        }
        else {
            throw new Exception("Could not read script status");
        }
    }

}
