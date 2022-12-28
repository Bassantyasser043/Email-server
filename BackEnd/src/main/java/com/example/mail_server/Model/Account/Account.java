package com.example.mail_server.Model.Account;

import com.example.mail_server.Model.DataManagement.FileManager;
import com.example.mail_server.Model.Filter.FilterSender;
import com.example.mail_server.Model.Filter.FilterSubject;
import com.example.mail_server.Model.Mail.MailContent;
import com.example.mail_server.Model.Contact;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;

public class Account {
    private String name;
    private String email;
    private String password;
    private LinkedList<MailContent> currentFolderindexMails ;
    private String currentFolderName;
    private LinkedList<Contact> contacts;
    private HashMap<String,LinkedList<MailContent>> userFolders;
    private FileManager fileManager;




    public Account(){
        currentFolderindexMails= new LinkedList<>();
        //contacts= new LinkedList<>();
        userFolders = new HashMap<>();
        fileManager = new FileManager();
    }
    public String getCurrentFolderName() {
        return currentFolderName;
    }

    public void setCurrentFolderName(String currentFolderName) {
        this.currentFolderName = currentFolderName;
    }
    public LinkedList<MailContent> getCurrentFolderindexMails() {
        return currentFolderindexMails;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

////modified
    public JSONArray uploadFolder( String folderName ,int page) throws IOException {
        int start=page*11-11;
        int end =page*10;
        int counter=0;
        this.currentFolderName=folderName;
        String path = "./Accounts/" +email + "/" + folderName + "/index.json";
        FileManager fileManager=new FileManager();
        JSONArray mails = fileManager.listJsonObjects(path);
        ///////////NEW
        LinkedList<MailContent> mailList = new LinkedList<>();
        JSONArray m = new JSONArray();
        for (Object o : mails) {
            JSONObject obj = (JSONObject) o;
            String receiver = obj.get("receiver").toString();
            //String p = obj.get("priority").toString();
           // int pr=Integer.valueOf(p);
           // System.out.println(p);
            MailContent mail = new MailContent((String) obj.get("subject"), (String) obj.get("body"),(String) obj.get("sender"), receiver,(String) obj.get("priority"),(String[]) obj.get("attachments") );
            mail.setId((String) obj.get("id"));
            mail.setSender((String) obj.get("sender"));
            System.out.println((String) obj.get("priority"));
            mail.setDeleteDate((String) obj.get("deleteDate"));
            if(counter>=start&&counter<=end) {
                mailList.add(mail);
                m.add(obj);
                if (counter == end){
                    break;
                }
            }
            counter++;
        }
        System.out.println("final");
        this.currentFolderindexMails=mailList;

        return m;

    }
    /*public Object[] filter(String sender, String subject){
        FilterSubject sub = new FilterSubject();
        FilterSender send = new FilterSender();
        FilterBoth b = new FilterBoth();
        if(sender.length()==0){
            return (sub.Filter(this.currentFolderindexMails,subject)).toArray();
        }else if(subject == null){
            return send.Filter(this.currentFolderindexMails,sender).toArray();
        }else{
            return b.filter(this.currentFolderindexMails,sender,subject).toArray();
        }
    }*/
    public JSONArray getFilteredMails(String folderName,String sender, String subject) throws IOException {
        String path = "./Accounts/" +email + "/" + folderName + "/index.json";
        FileManager fileManager=new FileManager();
        FilterSubject sub = new FilterSubject();
        FilterSender send = new FilterSender();
        JSONArray m = new JSONArray();
        JSONArray mails = fileManager.listJsonObjects(path);
        LinkedList<MailContent> mailList = new LinkedList<>();
        for (Object o : mails) {
            JSONObject obj = (JSONObject) o;
            m.add(obj);
        }
        if(sender.length()==0){
            return (sub.Filter(m,subject));
        }else{
            return send.Filter(m,sender);
        }
    }



    //-----------------------------------------Contacts--------------------------------------------//
    public boolean CheckContactName( String name) throws IOException {
        String path = "./Accounts/" + email+ "/" + "contacts.json";
        JSONArray contacts = fileManager.listJsonObjects(path);
        //to check that there is no already contact with the same name
        for (Object contact : contacts) {
            JSONObject obj = (JSONObject) contact;
            if (((String) obj.get("name")).equalsIgnoreCase(name)) {
                return false;
            }
        }

        return true;

    }

    public JSONArray uploadContacts() throws IOException {
        String path = "./Accounts/" + email+ "/" + "contacts.json";
        JSONArray contacts = fileManager.listJsonObjects(path);
        JSONArray getcontacts =new JSONArray();
        LinkedList<Contact> contactList = new LinkedList<Contact>();
        for (Object o : contacts) {
            JSONObject obj = (JSONObject) o;
            Contact contact = new Contact();
            contact.setName((String) obj.get("name"));
            JSONArray Emails = new JSONArray();
            Emails = (JSONArray) obj.get("email");
            String[] Contact_Email = new String[Emails.size()];
            for (int j = 0; j < Emails.size(); j++) {

                Contact_Email[j] = (String) Emails.get(j);
            }
            contact.setEmail(Contact_Email);
            contactList.add(contact);
            getcontacts.add(contact);
        }
        System.out.println(getcontacts + "hiiii");

        this.contacts=contactList;
        return getcontacts;
    }






}
