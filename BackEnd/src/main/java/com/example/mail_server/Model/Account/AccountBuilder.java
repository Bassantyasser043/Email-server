package com.example.mail_server.Model.Account;

import com.example.mail_server.Model.DataManagement.Directory;
import com.example.mail_server.Model.DataManagement.FileManager;

import java.io.File;
import java.io.IOException;

public class AccountBuilder {

    private Account account;
    private FileManager fileManager;
    private Directory directory;

    public AccountBuilder(){
        account = new Account();
        fileManager = new FileManager();
        directory = new Directory();
    }




    //for signup
    public Account build(String name ,String email ,String password) throws IOException {
        account.setName(name);
        account.setEmail(email);
        account.setPassword(password);
        buildDirectories();
        buildIndexFile();
        return  account;
    }
    public void buildDirectories(){
        //as folder of user same as email
        String path = "./Accounts/" + account.getEmail();
        System.out.println("build dier");
        directory.createFolder(path);
        directory.createFolder(path + "/inbox");
        directory.createFolder(path + "/sent");
        directory.createFolder(path + "/draft");
        directory.createFolder(path + "/trash");
    }
    public void buildIndexFile() throws IOException {
        fileManager.addAccount(account);
    }

}
