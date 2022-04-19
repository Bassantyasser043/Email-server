package com.example.mail_server.Model.Filter;

import com.example.mail_server.Model.Mail.MailContent;
import org.json.simple.JSONArray;
import org.junit.Before;
import org.junit.jupiter.api.Test;



import static org.junit.jupiter.api.Assertions.*;

 public class FilterSenderTest {
    JSONArray mails = new JSONArray();
    @Before
    void setup() {
        for (int i = 0; i < 5; i++) {
            MailContent temp = new MailContent("subject"+ i ,"body" + i,"sender"+i,"receiver"+i );
            mails.add(temp);
        }
    }

    @Test
    void filter() {
        FilterSender filterField = new FilterSender();
        filterField.Filter(mails,"sender 9");
    }

}