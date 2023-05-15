package com.example.mpp1.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class SqlService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String ExecuteScript(String script_name) throws Exception {
        try {
            long initial_time = System.nanoTime();
            ClassPathResource resource = new ClassPathResource("dbscripts/delete_distributor.sql");
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

//        // Specify the root directory path
//        String rootPath = "dbscripts";
//
//        System.out.println("Dbscripts folders");
//        try (Stream<Path> paths = Files.walk(Paths.get(rootPath))) {
//            paths.forEach(System.out::println);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        //String command = "dbscripts/execute_sql_script.sh " + script_name;
//        //String command = "ls dbscripts";
//        //Process process = Runtime.getRuntime().exec(command);
//
//        String filePath = "dbscripts/execute_sql_script.sh";
//        File file = new File(filePath);
//
//        if (file.exists()) {
//            System.out.println("File exists!");
//        } else {
//            System.out.println("File does not exist!");
//        }
//
//
//        String script_to_execute = "dbscripts/execute_sql_script.sh";
//        String[] command = {script_to_execute, "insert_car_model.sql"};
//
//        ProcessBuilder processBuilder = new ProcessBuilder(command);
//
//        try {
//            Process process = processBuilder.start();
//            int exitCode = process.waitFor();
//
//            if (exitCode == 0) {
//                // Script execution completed successfully
//                System.out.println("Script returned successfully.");
//            } else {
//                // Script execution encountered an error
//                System.out.println("Script execution failed with exit code: " + exitCode);
//            }
//
//            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//            String line = reader.readLine();
//            String last_line = line;
//            while (line != null) {
//                System.out.println(line);
//                last_line = line;
//                line = reader.readLine();
//            }
//            if (last_line != null) {
//                String command_success = last_line;
//                System.out.println("Last line is " + last_line);
//                if (command_success.contentEquals("Success")) {
//                    // Verify the log file
//                    try {
//                        BufferedReader br = new BufferedReader(new FileReader("dbscripts/logname.txt"));
//                        while ((line = br.readLine()) != null) {
//                            if (!line.contentEquals("INSERT 0 1000") && !line.contentEquals("ALTER SEQUENCE")
//                                    && !line.startsWith("DELETE")) {
//                                System.out.println("Problematic sql line: " + line);
//                                command_success = "The command executed but it has encountered errors.";
//                                break;
//                            }
//                        }
//                        br.close();
//                    }
//                    catch (IOException exception) {
//                        command_success = "The command executed successfully but could not read the log file. Reason: " + exception.getMessage();
//                    }
//
//                    if (command_success.contentEquals("Success")) {
//                        command_success = "The command executed successfully without any errors.";
//                    }
//                }
//                else {
//                    command_success = "The command failed to execute.";
//                }
//                return command_success;
//            }
//            else {
//                throw new Exception("Could not read script status");
//            }
//        } catch (IOException e) {
//            // Error handling for starting the process
//            throw new Exception(e.getMessage());
//        } catch (InterruptedException e) {
//            // Error handling for waiting for the process to complete
//        }

    }

}
