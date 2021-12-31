package com.example.mail_server.Model.Account;

import com.example.mail_server.Model.DataManagement.FileManager;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.File;
import java.io.IOException;

public class AccountProxy {

    public Account checkPassword(String email, String password) throws IOException {
        FileManager manager = new FileManager();
        JSONArray array = manager.listJsonObjects("./Accounts/Accounts.json");
        for (Object o : array) {
            JSONObject object = (JSONObject) o;
            if (object.get("email").equals(email) && object.get("password").equals(password)) {
                Account account = new Account();
                //getting attributes from account object
                account.setEmail(email);
                account.setName((String) object.get("name"));
                account.setPassword(password);
                return account;
            }
        }
        return null;
    }

    public boolean checkEmail(String email){
        File folder = new File("./Accounts");
        // returns an array of Files denoting the files in a given abstract pathname if the path name is a directory else returns null
        File[] list = folder.listFiles();
        // working with an API that cannot accept null parameters use asserts
        //if listFiles() returns null
        assert list != null;
        for(File file : list)
        {
            //if the name of the file exists means there is email like this
            if(file.getName().equalsIgnoreCase(email))
            {
                return true;
            }
        }
        return false;
    }

}
