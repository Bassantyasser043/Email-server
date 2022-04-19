package com.example.mail_server.Model.Mail;

import org.springframework.web.bind.annotation.RequestParam;

public class MailContent {
    private String subject;
    private String body;
    private String sender;
    private String receiver;
   // private String date;
    private String priority;
    private String[] attachments;
    private String id = "0" ;
    //private Object[] sortedBody;
    //private Object[] sortedSubject;
    private String deleteDate ;

    public String getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(String deleteDate) {
        this.deleteDate = deleteDate;
    }


////////////////modified
    public MailContent (String subject, String body, String sender, String receiver, String priority,String[] attachments){//, int priority) {
        this.subject = subject;
        this.body = body;
        this.sender = sender;
        this.receiver = receiver;
       // this.date = date;
        this.priority = priority;
       // this.sortedBody = indicesSorting.sortMailContent(body);
        //this.sortedSubject = indicesSorting.sortMailContent(subject);
        this.attachments = attachments;

    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        //this.sortedSubject = indicesSorting.sortMailContent(subject);
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        //this.sortedBody = indicesSorting.sortMailContent(body);
        this.body = body;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }


    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String[] getAttachments() {
        return attachments;
    }

    public void setAttachments(String[] attachments) {
        this.attachments = attachments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }




}
