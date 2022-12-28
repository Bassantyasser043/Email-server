package com.example.mail_server.Model.Filter;
import com.example.mail_server.Model.DataManagement.FileManager;
import com.example.mail_server.Model.Mail.MailContent;
import com.example.mail_server.Model.Contact;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
public interface IFilter {
    public JSONArray Filter(JSONArray mails, String filt);

}
