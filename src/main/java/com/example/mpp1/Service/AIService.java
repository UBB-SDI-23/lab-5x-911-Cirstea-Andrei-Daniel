package com.example.mpp1.Service;

import org.python.core.PyObject;
import org.python.core.PyString;
import org.python.core.PyUnicode;
import org.python.util.PythonInterpreter;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Map;

@Service
public class AIService {

    public float MakePrediction(String country) throws Exception {
        try {
            String pythonScript = "dbscripts/make_prediction.py";
            String argument = country;

            ProcessBuilder processBuilder = new ProcessBuilder("python", pythonScript, argument);
            Process process = processBuilder.start();

            // Wait for the process to complete
            int exitCode = process.waitFor();

            // Read the output from the process
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String last_line = "";
            String line;
            while ((line = reader.readLine()) != null) {
                last_line = line;
            }

            if (last_line.contentEquals("")) {
                throw new Exception("Failed to retrieve prediction for country " + country);
            }

            return Float.parseFloat(last_line);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw e;
        }
    }

}