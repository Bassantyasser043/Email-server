package com.example.mail_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;

@SpringBootApplication

public class MailServerApplication {

    public static void main(String[] args) throws IOException {
        File folder = new File("./Accounts");
        File folder_two = new File("./Accounts/Attachments");
        folder_two.mkdir();
        System.out.println( folder.mkdir() );

        SpringApplication.run(MailServerApplication.class, args);
    }

}
