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

        //String command = "dbscripts/execute_sql_script.sh " + script_name;
        //String command = "ls dbscripts";
        //Process process = Runtime.getRuntime().exec(command);

        String command = "/bin/bash";
        String script_to_execute = "dbscripts/execute_sql_script.sh";

        ProcessBuilder processBuilder = new ProcessBuilder(command, script_to_execute, script_name);

        try {
            Process process = processBuilder.start();
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                // Script execution completed successfully
                System.out.println("Script returned successfully.");
            } else {
                // Script execution encountered an error
                System.out.println("Script execution failed with exit code: " + exitCode);
            }

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
        } catch (IOException e) {
            // Error handling for starting the process
            throw new Exception(e.getMessage());
        } catch (InterruptedException e) {
            // Error handling for waiting for the process to complete
        }

        return "Unknown error";
    }

}
