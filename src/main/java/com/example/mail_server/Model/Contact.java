package com.example.mail_server.Model;

public class Contact {
    private String name;
    private String[] email;

    public  Contact(){}
    public Contact(String name,String[] email ){
        this.email=email;
        this.name=name;
    }

    public String[] getEmail() {
        return email;
    }

    public void setEmail(String[] email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
