package com.example.mail_server.Controller;

import com.example.mail_server.Model.*;
import com.example.mail_server.Model.Account.Account;
import com.example.mail_server.Model.DataManagement.FileManager;
//import com.example.mail_server.Model.Mail.Mail;
//import com.example.mail_server.Model.Mail.MoveMails;
import com.example.mail_server.Model.Mail.Mail;
import com.example.mail_server.Model.Mail.MailContent;
//import com.example.mail_server.Model.Search.mailSearchResults;
import com.example.mail_server.Model.Mail.Mailmoves;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import com.example.mail_server.Model.DataManagement.FileManager;
import java.io.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedList;
@RestController
@CrossOrigin (origins = "http://localhost:4200")

public class controller {
    private User user;
    LinkedList<LinkedList<String>> file;
    private String folder;
    public controller(){
        user = User.getInstance();
        file = new LinkedList<>();
    }

    @CrossOrigin
    @RequestMapping("/signUp")
    //@GetMapping("/cc")
    //@ResponseBody
    public boolean createAccount(@RequestParam String name, @RequestParam String email, @RequestParam String password) throws IOException {
        return user.signUp(name, email, password);
    }
    @CrossOrigin
    @RequestMapping("/signIn")
    //@ResponseBody
    public boolean signIn( @RequestParam String email, @RequestParam String password) throws IOException {
        System.out.println("ddd");
        return user.signIn(email, password);
    }

    @CrossOrigin
    @GetMapping("/compose")
    public boolean compose(@RequestParam String[]  receivers,@RequestParam String subject,@RequestParam String body,@RequestParam String priority,@RequestParam String[] attachments) throws IOException {
        Account acc =new Account();
        Mail mail =new Mail();
        mail.setReceivers( receivers);
        mail.setSubject(subject);
        mail.setBody(body);
        mail.setPriority(priority);
        if(attachments==null){
            attachments[0]="No Attachments";
        }
        mail.setAttachments(attachments);
        System.out.println(mail+"d5lt");
        /*LinkedList<String> temp = file.peek();
        if(temp != null)
            mail.setAttachments(file.pop());
        else mail.setAttachments(new LinkedList<>());*/
        return user.Compose(mail);
    }
    @CrossOrigin
    @GetMapping("/draft")
    public boolean draft(@RequestParam String[] receivers,@RequestParam String subject,@RequestParam String body,@RequestParam String priority,@RequestParam String[] attachments ) throws IOException {

        Mail mail =new Mail();
        mail.setReceivers(receivers);
        mail.setSubject(subject);
        System.out.println("draft");
        mail.setSubject(subject);
        mail.setPriority(priority);
        mail.setAttachments(attachments);
        mail.setBody(body);

        return user.draft(mail);
    }


    @CrossOrigin
    @GetMapping("/getMails")
    public JSONArray getListMails(@RequestParam String folderName,@RequestParam int pagenumber) throws IOException {
        Account acc = user.getCurrentUser();
        this.folder=folderName;
        return acc.uploadFolder(folderName,pagenumber);
    }
    @CrossOrigin
    @GetMapping ("/move")
    public boolean moveMails(@RequestParam String[] id,@RequestParam String folderName) throws IOException {
        Mailmoves moveMail =new Mailmoves(folderName,id);
        return user.moveMail(moveMail.getId(), moveMail.getFolderName());
    }
    @CrossOrigin
    @GetMapping("/addFolder")
    public boolean addFolder(@RequestParam String folderName) throws IOException {
        System.out.println("hiFolder");
        return User.getInstance().createNewFolder(folderName);
    }

    @CrossOrigin
    @DeleteMapping ("/deleteFolder")
    public boolean deleteFolder(@RequestParam String folderName) throws IOException {
        System.out.println("byeFolder");
        return User.getInstance().deleteFolders(folderName);
    }
    @CrossOrigin
    @GetMapping ("/renameFolder")
    public boolean renameFolder(@RequestParam String oldName,@RequestParam String newName) throws Exception {
        System.out.println("renamedFolder");
        return User.getInstance().renameFolder(oldName,newName);
    }
    @CrossOrigin
    @GetMapping ("/getFolders")
    public String[] getFolder() throws Exception {
        System.out.println("gotFolders");
        return User.getInstance().getFolders();
    }
    @CrossOrigin
    @GetMapping("/addContact")
    public boolean  addContact(@RequestParam String name,@RequestParam String[] email) throws IOException {
        System.out.println ("yarabbbb");
        Contact contact=new Contact(name,email);
        return user.addContact(contact);
    }


    /* @CrossOrigin
     @PostMapping("/addContact")
     public boolean  addContact(@RequestBody Contact contact) throws IOException {
         System.out.println("yarabbbb");

         return user.addContact(contact);

     }*/
    @CrossOrigin
    @GetMapping("/getContacts")

    public JSONArray getContacts() throws IOException {
        System.out.println("GETTTcony");
        Account acc = user.getCurrentUser();
        return acc.uploadContacts();

    }
    @CrossOrigin
    @DeleteMapping("/removeContact")
    public boolean  removeContact(@RequestParam  String id ) throws IOException {
        String path = "./Accounts/" + user.getCurrentUser().getEmail() + "/contacts.json";
        FileManager fileManager = new FileManager();
        fileManager.removeContact(path,id);
        return true;
    }
    @CrossOrigin
    @GetMapping("/filterMails")
    public JSONArray   filterMAils(@RequestParam String sender,@RequestParam String subject) throws IOException {
        System.out.println ("yarabbbb");
        Account acc = user.getCurrentUser();
        return acc.getFilteredMails(this.folder,sender,subject);
    }
}
