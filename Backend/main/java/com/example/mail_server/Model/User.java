package com.example.mail_server.Model;

import com.example.mail_server.Model.Account.Account;
import com.example.mail_server.Model.Account.AccountBuilder;
import com.example.mail_server.Model.Account.AccountProxy;
import com.example.mail_server.Model.DataManagement.Directory;
import com.example.mail_server.Model.DataManagement.FileManager;
/*import com.example.mail_server.Model.Filter.FilterField;
import com.example.mail_server.Model.Filter.Filteration;
import com.example.mail_server.Model.Filter.SenderField;
import com.example.mail_server.Model.Filter.SubjectField;*/

import com.example.mail_server.Model.Mail.Mail;
import com.example.mail_server.Model.Mail.MailContent;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;

public class User {

    private Account currentUser;
    private static AccountProxy proxy;
    private static AccountBuilder builder;
    private static User firstInstance;

    public Account getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(Account currentUser) {
        this.currentUser = currentUser;
    }

    private User() {}
    public static User getInstance()
    {
        //singleton design pattern
        if(firstInstance == null){
            firstInstance = new User();
            proxy = new AccountProxy();
            builder = new AccountBuilder();
        }
        return firstInstance;
    }
    public boolean signUp(String name, String email, String password) throws IOException {
        if(proxy.checkEmail(email))
            return false;
        currentUser = builder.build(name, email, password);
        return true;
    }
    public boolean createNewFolder(String folderName) throws IOException {
        Directory dir = new Directory();
        if(dir.createUserFolder(folderName, this.currentUser))
        {
            FileManager file = new FileManager();
            String path = "./Accounts/" + this.currentUser.getEmail() + "/" + folderName + "/index.json";
            file.listJsonObjects(path);
            return true;
        }
        return false;
    }
    public boolean signIn(String email, String password) throws IOException {
        //function checkpassword return the account object after check that it is exist in jsonfile of accounts
        currentUser = proxy.checkPassword(email, password);
        //to return true or false
        return currentUser != null;
    }
    ///////////////////////
    public boolean Compose(Mail mail) throws IOException {

        if(!checkReceivers(mail)){return false;}
        //get email of the sender from currentUser which we set in sign in and sign up
        //setsender to mail object
        mail.setSender(currentUser.getEmail());
        System.out.println(currentUser.getEmail()+ "compose user");
        //save mail in sent folder
        //Mail class email m4 attribute
        this.saveMail(mail,currentUser.getEmail(),"sent");
        for (String receiver: mail.getReceivers()) {
            this.saveMail(mail,receiver,"inbox");
        }
        return true;
    }
    //-------------------------------------CONTACTS--------------------------------------//
    public boolean addContact(Contact contact) throws IOException {
        //check if the name of contact already present or not
        if(!currentUser.CheckContactName(contact.getName())){
            return false;
        }
        //check if the email really present or not
        for (String email: contact.getEmail()) {
            if(!proxy.checkEmail(email)){
                return false; }
        }

        FileManager json = new FileManager();
        String path="./Accounts/"+currentUser.getEmail()+"/contacts.json";
        json.addContact(contact,path);

        return true;
    }

    public boolean checkReceivers(Mail mail){
        //loop on the array of recievers
        for (String receiver: mail.getReceivers()) {
            //check if this account exist or not
            if(!proxy.checkEmail(receiver)){
                return false;
            }
        }
        return true;
    }

    public void saveMail(Mail mail, String E_mail, String folder) throws IOException {
        System.out.println("saveMail");
        Directory directory=new Directory();
        FileManager json = new FileManager();
        //accoording to mail it might save in sent or inbox folder
        String myPath = "./Accounts/"+E_mail+"/"+folder+"/index.json";
        //btro7 listJsonObjects btrg3 json array then get the last id and increment it
        mail.setId(json.setNewID(myPath));

        directory.createFolder("./Accounts/"+E_mail+"/"+folder+"/"+mail.getId());
        String path="./Accounts/"+E_mail+"/"+folder+"/"+mail.getId()+"/"+mail.getId()+".json";
        json.saveJsonFile(mail, path);
        String s;
        if(mail.getReceivers().length==0){
            s=" ";
        }else{
            s=mail.getReceivers()[0];
        }
        MailContent indexMail = new MailContent(mail.getSubject(),mail.getBody(),mail.getSender(),s,mail.getPriority(),mail.getAttachments());
        indexMail.setId(mail.getId());
        indexMail.setSender(mail.getSender());
        json.addMailToIndex(indexMail, myPath);
    }
//////////////////////////////////
    public boolean draft(Mail mail) throws IOException {
        System.out.println("draft");
        mail.setSender(currentUser.getEmail());
        System.out.println("d5ltt");
        this.saveMail(mail,currentUser.getEmail(),"draft");
        return true;
    }
////////////////////////////////
    public boolean moveMail( String[] id, String folderName) throws IOException {
        Directory dir = new Directory();
        //check if there is folder with same name in this user account
        if(!dir.checkFolderExistence(folderName, this.currentUser))
            return false;
        FileManager json=new FileManager();
        LinkedList<MailContent> mails=currentUser.getCurrentFolderindexMails();
        for (String s : id) {
            for (MailContent mail : mails) {
                if (mail.getId().equalsIgnoreCase(s)) {
                    mails.remove(mail);
                    if(folderName.equalsIgnoreCase("trash"))
                    {
                        SimpleDateFormat formatter= new SimpleDateFormat("YYYY-MM-dd-HH-mm-ss");
                        Date now = new Date(System.currentTimeMillis());

                        mail.setDeleteDate(formatter.format(now));
                    }
                    json.moveMail(s, currentUser, mail, folderName);

                    break;
                }

            }
        }

        return true;
    }
    ///////////////////////////////////////////////////
    public boolean deleteFolders (String folderName){
        if(folderName.equals("inbox")||folderName.equals("sent")||folderName.equals("trash")||folderName.equals("draft")){
            return false;
        }
        Directory dir = new Directory();
        //Java can't delete folder that contains files, so files should be deleted first, then the folder.
        return dir.CheckBeforeDelete(new File("./Accounts/" + this.currentUser.getEmail() + "/" + folderName));
    }
    public boolean renameFolder(String oldName, String newName) throws Exception {
        if(oldName.equals("inbox")||oldName.equals("sent")||oldName.equals("trash")||oldName.equals("draft")){
            return false;
        }
        Directory dir =new Directory();
        Account acc = getCurrentUser();
        String path = "./Accounts/" + acc.getEmail() + "/" + oldName;
        String newPath = "./Accounts/" + acc.getEmail() + "/" + newName;
        if(!dir.folderNameIsValid(path, oldName)){
            return false;
        }
        if(!dir.folderNameIsValid(newPath, newName)){
            return false;
        }
        if(!(new File(path).exists())) {
            return false;
        }
        if((new File(newPath).exists())) {
            return false;
        }
        if(!dir.rename(new File(path), new File(newPath))){
            return false;
        }

        return true;
    }
    public String[] getFolders() {
        String path = "./Accounts/" + currentUser.getEmail();
        File dir = new File(path);
        String[] list= dir.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return !(name.equals("inbox") || name.equals("sent") || name.equals("draft") || name.equals("trash"));
            }
        });
        return list;
    }
}


