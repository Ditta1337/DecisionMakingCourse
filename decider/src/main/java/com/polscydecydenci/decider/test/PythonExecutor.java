package com.polscydecydenci.decider.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class PythonExecutor {
    public static void executePython() {
        try {
            // The command to execute the Python script
            String command = "python3 main/resources/deciderAlgorithm.py";

            // Execute the command
            ProcessBuilder processBuilder = new ProcessBuilder(command.split(" "));
            Process process = processBuilder.start();

            // Capture the output of the Python script
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);  // Output from Python script
            }

            // Wait for the process to exit and get the exit code
            int exitCode = process.waitFor();
            System.out.println("Python script executed with exit code: " + exitCode);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
