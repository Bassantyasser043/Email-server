import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';

//import{Inbox} from'./home.component'
@Component({
  selector: 'app-home',
  templateUrl: './contactview.component.html',
  styleUrls: ['./contactview.component.css']
})

export class ContactviewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    this.IIInbox=[];
    this.getcontacts();
    console.log("FKDIIUGH"+this.t);
    }
  
massege:any=[]; 
IIInbox:any[]=[];
don:any[]=[];
account:any
email="atooka@gmail.com";
list:any
icon:any
box:any
icon1:any
listItem:any
firstItem:any
sender:any
subject:any
id:any
view:any;
namefolder:any
check:boolean=false;
product:any;
page:any=1;
Inbox={
  receiver: "",
  sender: "",
  subject: "",
  id: 0,
  body:"",
  selected:false,
}


selected:any=[]
t:any;
  display(){
     this.account = document.getElementById("account-info");
    this.account.style.display = "block";
  }

 CheckAllOptions() {
    val:Boolean;
  if (this.IIInbox.every((val: any) => val.selected == true))
    this.IIInbox.forEach((val: any) => { val.selected = false });
  else
    this.IIInbox.forEach((val: any) => { val.selected = true });
    console.log(this.IIInbox);
};
select(ischeck:boolean,id:number){
  console.log(this.IIInbox);
  let obj = this.IIInbox.find((o:any, i:any) => {
    if (o.id === id) {
            this.IIInbox[i].selected =ischeck;
        return true; // stop searching
    }
    else{console.log("what");
    return false;
  } 
});
console.log(this.IIInbox);
}
///////////////pagenumber
pagenumber(number:number){
  if(this.page<=1 &&number===-1) alert("can't move anymore");
  else{
  this.page=this.page+number;
  this.test();
  this.parse();}
}
displaymassege(index:any){
 this.account = document.getElementById("account-info");
 this.account.style.display = "block";
}
clickinbox(){
  this.box = document.getElementById("inbox-menu");
  this.icon1 = document.getElementById("inbox-icon");
  
 if(this.box.style.display === "none")
 {
   this.box.style.display = "block";
   this.icon1.className = "fas fa-caret-up check-icon";
 }
 else
 {
   this.box.style.display = "none";
   this.icon1.className = "fas fa-caret-down check-icon"
 }
}
Exitfolder(){
  this.box = document.getElementById("inbox-menu");
  this.box.style.display="none";
}
selection:any[]=[];
getselection(){
  this.selection=[];
  for(let i=0;i< this.IIInbox.length;i++){
    if(this.IIInbox[i].selected===true)
    this.selection.push(this.IIInbox[i].id);
  }
}
contact={
  contact_name: "",
  primary_email: [],
  selected:false,
 }
getcontacts(){

  console.log("hiiii")
  this.http.get('http://localhost:8085/getContacts', {
       responseType: 'json',
       params: {
       },
       observe: "response"
 
     })
       .subscribe((response) => {
         this.t=response.body
         console.log(this.t);
        
         for(let item of this.t){ 
          this.contact={
           contact_name: "",
           primary_email: [],
           selected:false
          }
       
      this.contact.contact_name=item.name;
      this.contact.primary_email=item.email;
  
      this.IIInbox.push(this.contact)
  }
         // console.log(this.contact.contact_name +"name")
          console.log(this.IIInbox)
          
      
       }) 
 }
movetrash(){
  this.getselection();
  this.http.get('http://localhost:8085/move', {
    responseType: 'text',
    params: {
     id:this.selection,
     folderName:"trash"
    },
    observe: "response"

  })
    .subscribe((response) => {
      this.t = response.body
      if (this.t == "true") {
        alert('Message moved to trash');
      } else {
        alert('The Reciever Email Cannot Be Found!! Message Isnot Sent Successfully!!');
      }

      console.log("bob");
    })      
}
Sentence:string=""
message_reciv:string="";
sub:string=""
getindex(id:any){
   this.Sentence=""
   this.message_reciv=""
   this.sub=""
   for(let item of this.t){
     if(item.id===id){
       this.Sentence=item.body;
       this.message_reciv=item.sender;
       this.sub=item.subject;
     }
   }
   this.clickinbox();
}

  hide(){
    this.account = document.getElementById("account-info");
    this.account.style.display = "none";
  }
 
  clickSort(){
     this.list = document.getElementById("sortList");
     this.icon = document.getElementById("list-icon");
    if(this.list.style.display === "none")
    {
      this.list.style.display = "block";
      this.icon.className = "fas fa-caret-up list-icon";
    }
    else
    {
      this.list.style.display = "none";
      this.icon.className = "fas fa-caret-down list-icon";
    }
  }
  

 


  test(){
    console.log("zoz")
   this.http.get('http://localhost:8085/getMails', {
     responseType: 'json',
     params: {
      folderName:"inbox",
      pagenumber:this.page
      },
     observe: "response"
 
   })
   .subscribe((response) => {
     this.t=response.body
     console.log(this.t);
    
     for(let item of this.t){ 
      this.Inbox={
        receiver: "",
        sender: "",
        subject: "",
        id: 0,
        body:"",
        selected:false,
      }
      this.Inbox.receiver=item.receiver;
      this.Inbox.sender=item.sender;
      this.Inbox.subject=item.subject;
      this.Inbox.id=item.id;
      this.Inbox.body=item.body.substring(0,Math.floor(item.body.length/2));
      this.Inbox.selected=false;
      this.IIInbox.push(this.Inbox)
  }
 })
 
 
  }
  folders:any=[];
  getFolders() {
    this.http.get('http://localhost:8085/getFolders', {
      responseType: 'text',
      params: {
       
      },
      observe: "response"
  
    })
      .subscribe((response) => {
        this.t = response.body
        console.log(this.t);
        this.t=this.t.replaceAll("[","");
        this.t=this.t.replaceAll("]","");
        this.t=this.t.replaceAll("\"","");
        this.folders=this.t.split(",");
  
        console.log(this.folders[0]);
        
        console.log("bob");
      })
  }
  parse(){
    this.IIInbox=[];
    
    for(let item of this.t){ 
      this.Inbox={
        receiver: "",
        sender: "",
        subject: "",
        id: 0,
        body:"",
        selected:false,
      }
      this.Inbox.receiver=item.receiver;
      this.Inbox.sender=item.sender;
      this.Inbox.subject=item.subject;
      this.Inbox.id=item.id;
      this.Inbox.body=item.body.substring(0,Math.floor(item.body.length/2));
      this.Inbox.selected=false;
      this.IIInbox.push(this.Inbox)
  }

      
    
  }
 

}
