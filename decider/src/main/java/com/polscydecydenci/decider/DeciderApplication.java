package com.polscydecydenci.decider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class DeciderApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeciderApplication.class, args);
    }

}
