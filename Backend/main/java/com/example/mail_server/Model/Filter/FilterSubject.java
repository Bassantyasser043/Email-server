package com.example.mail_server.Model.Filter;

import com.example.mail_server.Model.Mail.MailContent;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.LinkedList;
import java.util.Map;

public class FilterSubject implements IFilter {
    @Override
    public JSONArray Filter(JSONArray mails, String subject){
        LinkedList<MailContent> m = new LinkedList<>();
        JSONArray filtMail = new JSONArray();
        /*for( mail : mails){
            if(mail.getSubject().contains(subject)){
                filtMail.add(mail.);
               // m.add(mail);
            }

        }*/
        for (Object o : mails) {
            JSONObject obj = (JSONObject) o;
            String receiver = obj.get("receiver").toString();
            MailContent mail = new MailContent((String) obj.get("subject"), (String) obj.get("body"),(String) obj.get("sender"), receiver,(String) obj.get("priority"),(String[]) obj.get("attachments") );
            mail.setId((String) obj.get("id"));
            mail.setDeleteDate((String) obj.get("deleteDate"));
            if(mail.getSubject().contains(subject)){
                m.add(mail);
                filtMail.add(obj);
            }
        }
        System.out.println(m);
        return filtMail;
    }
}
