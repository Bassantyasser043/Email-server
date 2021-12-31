package com.example.mail_server.Model.DataManagement;
import com.example.mail_server.Model.Account.Account;
import com.example.mail_server.Model.Mail.Mail;
import com.example.mail_server.Model.Mail.MailContent;
import com.example.mail_server.Model.Contact;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.stream.JsonReader;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.junit.Assert;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;

public class FileManager {


    public void addAccount(Account account) throws IOException {
        String path = "./Accounts/Accounts.json";
        JSONArray accounts = listJsonObjects(path);
        JSONObject new_account = new JSONObject();
        //setting getting atrributes of valu and put it in the jsonarray to be added in json file
        new_account.put("name",account.getName());
        new_account.put("email",account.getEmail());
        new_account.put("password",account.getPassword());

        accounts.add(new_account);
        addObjectToJson(path,accounts);
    }






    public void addObjectToJson(String path, JSONArray array) throws IOException{
        //the path of json object
        File index = new File(path);
        FileWriter writer = new FileWriter(index);
        //to add the new account to json file
        writer.write(array.toJSONString());
        writer.close();
    }

    public JSONArray listJsonObjects(String path) throws IOException{
        File index = new File(path);
        FileWriter writer;
        if(!index.exists()) {
            index.createNewFile();
            JSONArray array = new JSONArray();
            writer = new FileWriter(index);
            //lesa 7tt array.toJSONString()
            writer.write(array.toJSONString());
            writer.close();
            return array;
        }
        JSONParser jsonParser = new JSONParser();
        try {
            FileReader reader = new FileReader(path);
            JSONArray jsonArray= (JSONArray) jsonParser.parse( reader );
            ///testtttt
            System.out.println(jsonArray);
            reader.close();
            return jsonArray;
        }
        catch (IOException | ParseException e){
            e.printStackTrace();
            return null;
        }
    }
///////////////////////////////////////////////////////
    ////add mails to json

    public void addMailToIndex(MailContent mail, String path) throws IOException {
        System.out.println("addindex");
        JSONArray mails = listJsonObjects(path);
        JSONObject newMail = new JSONObject();
        newMail.put("id",mail.getId());
        newMail.put("sender",mail.getSender());
        newMail.put("receiver", mail.getReceiver());
        newMail.put("subject", mail.getSubject());
        //newMail.put("date", mail.getDate());
        newMail.put("body", mail.getBody());

        //newMail.put("priority",mail.getPriority());
        //newMail.put("deleteDate", mail.getDeleteDate());
        mails.add(newMail);
        addObjectToJson(path,mails);

    }

   /* public Mail getMailContent(String path) throws IOException, ParseException {
        Gson gson = new Gson();
        JsonReader reader = new JsonReader(new FileReader(path));
        return gson.fromJson(reader, Mail.class);
    }*/
//////////////////////////////////////////////////////////////////////////////////////////////////
    public String setNewID(String path) throws IOException {
        //As each mail has it's own id
        JSONArray list = listJsonObjects(path);
        if(list == null || list.size() == 0)
        { return("0");
        }
        JSONObject lastMail = (JSONObject) list.get(list.size() - 1);
        //increment the last id present
        long id = Long.parseLong((String)lastMail.get("id")) + 1;
        return (Long.toString(id));
    }
    ///
    public void saveJsonFile(Object object,String filePath){
        try (Writer writer = new FileWriter(filePath)) {
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            gson.toJson(object, writer);
            Assert.assertTrue(Files.exists(Paths.get(filePath)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //////////////////////////////////////
    public boolean moveMail(String id,Account account,MailContent mail,String folderName) throws IOException {
        Directory directory=new Directory();
        //here is the path where the email was present
        String sourcePath="./Accounts/"+account.getEmail()+"/"+account.getCurrentFolderName()+"/"+id;
        //this is the path that we wanted to move the mail to
        String path="./Accounts/"+account.getEmail()+"/"+folderName+"/index.json";

        mail.setId(this.setNewID(path));
        this.addMailToIndex(mail,path);
        this.deleteFromIndex("./Accounts/"+account.getEmail()+"/"+account.getCurrentFolderName()+"/index.json",id);
        path="./Accounts/"+account.getEmail()+"/"+folderName+"/"+mail.getId();
        directory.createFolder(path);
        directory.CopyFolder(new File(sourcePath),new File(path),mail.getId());
        directory.DeleteFolder(new File(sourcePath));


        return true;
    }
    public void deleteFromIndex(String path ,String id) throws IOException {
        JSONObject mail=new JSONObject();
        JSONArray list = listJsonObjects(path);
        for (Object o : list) {
            mail = (JSONObject) o;
            if (((String) mail.get("id")).equalsIgnoreCase(id)) {
                break;
            }
        }
        list.remove(mail);
        addObjectToJson(path,list);

    }
    //------------------------CONTACT------------------//
    public void addContact(Contact contact, String path) throws IOException {
        JSONArray contacts = listJsonObjects(path);
        JSONArray Emails=new JSONArray();
        Collections.addAll(Emails, contact.getEmail());
        JSONObject new_contact = new JSONObject();
        new_contact.put("name",contact.getName());
        new_contact.put("email",Emails);
        contacts.add(new_contact);
        addObjectToJson(path,contacts);
    }
    public void removeContact(String path, String name) throws IOException {
        JSONArray contacts = listJsonObjects(path);
        System.out.println(contacts);
        for (int i = 0 ; i < contacts.size() ;i++) {
            JSONObject jsonobject = (JSONObject) contacts.get(i);
            if(jsonobject.get("name").equals(name)){
                contacts.remove(i);
            }
        }
        System.out.println(contacts);
        addObjectToJson(path,contacts);
    }



}