package com.example.mail_server.Model.Mail;

public class Mailmoves {
    private String [] id;
    private String folderName;
    public Mailmoves(String folderName, String[] id){
        this.folderName = folderName;
        this.id = id;
    }

    public String[] getId() {
        return id;
    }

    public void setId(String[] id) {
        this.id = id;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }
}
