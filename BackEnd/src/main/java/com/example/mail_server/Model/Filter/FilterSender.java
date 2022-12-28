package com.example.mail_server.Model.Filter;

import com.example.mail_server.Model.Mail.MailContent;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.LinkedList;

public class FilterSender implements IFilter{
    @Override
    public JSONArray Filter(JSONArray mails, String sender){
        System.out.println(sender);
        LinkedList<MailContent> m = new LinkedList<>();
        JSONArray filtMail = new JSONArray();
        System.out.println(sender);
        /*for(MailContent mail : mails){
            if(mail.getSender().contains(sender)){
                filtMail.add(mail.toString());
            }

        }*/
        for (Object o : mails) {
            JSONObject obj = (JSONObject) o;
            String receiver = obj.get("receiver").toString();
            MailContent mail = new MailContent((String) obj.get("subject"), (String) obj.get("body"),(String) obj.get("sender"), receiver,(String) obj.get("priority"),(String[]) obj.get("attachments") );
            mail.setId((String) obj.get("id"));
            mail.setDeleteDate((String) obj.get("deleteDate"));
            if(mail.getSender().contains(sender)){
                m.add(mail);
                filtMail.add(obj);
            }
        }
        System.out.println(sender);
        return filtMail;
    }
}
