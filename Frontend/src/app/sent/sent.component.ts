import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

//import{Inbox} from'./home.component'
@Component({
  selector: 'app-home',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})

export class SentComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    this.IIInbox=[];
    this.test();
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
  priority:"",
  attachments:[],
  selected:false,
}


selected:any=[]
t:any;
fruits: string[] = ['Apple', 'Orange', 'Banana'];
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
senderfilter:any;
filtersubject:any;
  getsubject(){
    this.senderfilter=(<HTMLInputElement>document.getElementById("sender-filter")).value;
    this.filtersubject=(<HTMLInputElement>document.getElementById("subject-filter")).value;
  }
  Filter(){
    this.getsubject();
    this.http.get('http://localhost:8085/filterMails', {
      responseType: 'json',
      params: {
       sender: this.senderfilter,
       subject: this.filtersubject,
      },
      observe: "response"
  
    })
      .subscribe((response) => {
        this.t=response.body
       console.log(this.t);
       this.IIInbox=[];
        for(let item of this.t){ 
        this.Inbox={
          receiver: "",
          sender: "",
          subject: "",
          id: 0,
          body:"",
          priority:"",
          attachments: [],
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
        console.log("bob");
      })      
  
  }
  ffolders:any[]=[]
 createfolder(){
  this.box = document.getElementById("c-menu");
   this.namefolder=(<HTMLInputElement>document.getElementById("sender-folder")).value;//send to backend
   console.log(this.namefolder)
   if(this.namefolder!==''){
    this.box.style.display = "none";
    this.ffolders.push(this.namefolder);
    console.log(this.ffolders)
    this.addFolder();
   }else{
     alert("enter name of the folder.")
   }
  
 }
 foldermove:any

okmove(){
  this.getselection();
  this.foldermove = (<HTMLInputElement>document.getElementById("movename")).value;
  if(this.folderdeleted===''){
    alert("please enter the name of old folder and new ");
  }
  this.box = document.getElementById("move-menu");
  this.box.style.display="none";
  console.log(this.foldermove);
  //foldermove >>> send to backend
  this.moveemail();
}
moveemail(){
  console.log(this.selection);   
  this.http.get('http://localhost:8085/move', {
    responseType: 'text',
    params: {
      id:this.selection,
     folderName:this.foldermove,

     },
    observe: "response"

  })
  .subscribe((response) => {
    this.t=response.body
      if(this.t=="true"){
        alert('Folder moved Successfully!!');
      }else{
        alert('This Name IS Already In Use!! Please Enter A Different Name!!');
      }
  
    console.log("bob");   
})
 }
 addFolder(){
  this.http.get('http://localhost:8085/addFolder', {
    responseType: 'text',
    params: {
     folderName:this.namefolder,

     },
    observe: "response"

  })
  .subscribe((response) => {
    this.t=response.body
      if(this.t=="true"){
        alert('Folder Created Successfully!!');
      }else{
        alert('This Name IS Already In Use!! Please Enter A Different Name!!');
      }

    console.log("bob");   
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
 clickmove(){
  this.box = document.getElementById("move-menu");
  this.icon1 = document.getElementById("delete-folder");
  
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
///////////////////
  oldname:any
  newname:any
  okrename(){
    this.oldname = (<HTMLInputElement>document.getElementById("oldname")).value;
    this.newname= (<HTMLInputElement>document.getElementById("newname")).value;
    if(this.oldname==='' || this.newname===''){
      alert("please enter the name of old folder and new ");
    }
    this.box = document.getElementById("r-menu");
    this.box.style.display="none";
    console.log(this.oldname);
    console.log(this.newname);
  }
  folderdeleted:any
  okdelete(){
    this.folderdeleted = (<HTMLInputElement>document.getElementById("deletename")).value;
    if(this.folderdeleted===''){
      alert("please enter the name of old folder and new ");
    }
    this.box = document.getElementById("delete-menu");
    this.box.style.display="none";
    console.log(this.folderdeleted);
  }
  deletefolder(){
    this.list = document.getElementById("delete-menu");
    this.icon = document.getElementById("delete-folder");
   if(this.list.style.display === "none"){
     this.list.style.display = "block";
     this.icon.className = "fas fa-caret-up list-icon";
   }
   else
   {
     this.list.style.display = "none";
     this.icon.className = "fas fa-caret-down list-icon";
   }
 }
  renamefolder(){
    this.list = document.getElementById("r-menu");
    this.icon = document.getElementById("rename-folder");
   if(this.list.style.display === "none"){
     this.list.style.display = "block";
     this.icon.className = "fas fa-caret-up list-icon";
   }
   else
   {
     this.list.style.display = "none";
     this.icon.className = "fas fa-caret-down list-icon";
   }
 }
  
  Clickfolder(){
    this.box = document.getElementById("c-menu");
    this.icon1 = document.getElementById("c-icon");
    
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

///////////////pagenumber
pagenumber(number:number){
  if(this.page<=1 &&number===-1) alert("can't move anymore");
  else{
  this.page=this.page+number;
  this.test();
  this.parse();
 // this.router.navigateByUrl('\home');
}
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
  

  clickFilter(){
     this.box = document.getElementById("check-menu");
     this.icon1 = document.getElementById("check-icon");
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
  ToFilterEmails(){
    this.sender = (<HTMLInputElement>document.getElementById("sender-filter")).value;
    this.subject = (<HTMLInputElement>document.getElementById("subject-filter")).value;
    //both should be sent to backend to make filter then get response from back to show in front
    console.log(this.sender)
    console.log(this.subject)
  }


   va(){
     console.log("yarab yarab");
   }
   test(){
    console.log("zoz")
   this.http.get('http://localhost:8085/getMails', {
     responseType: 'json',
     params: {
      folderName:"sent",
      pagenumber:1
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
        priority:"",
        attachments: [],
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
  parse(){
    this.IIInbox=[];
    
    for(let item of this.t){ 
      this.Inbox={
        receiver: "",
        sender: "",
        subject: "",
        id: 0,
        body:"",
        priority:"",
        attachments:[],
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
  refresh(){
    window.location.reload();
  }
}
