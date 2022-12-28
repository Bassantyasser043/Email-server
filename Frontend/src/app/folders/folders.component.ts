import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    // this.IIInbox=[];
     this.getFolders();
    
  
   
    // console.log("FKDIIUGH"+this.t);
    }
    refresh(){
      window.location.reload();
    }
selectedid:any[]=[];
massege:any=[]; 
IIInbox:any[]=[];
don:any[]=[];
account:any
email="atoka@gmail.com";
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
    else{
      console.log("what");
    return false;
  } 
});
console.log(this.IIInbox);
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
 ////////////////////////////////////////
 ffolders:string[]=[]//////////vkgdf
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

 //////////////////////////////////////////////
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
 //////////////////
 renameFolder(){
  this.http.get('http://localhost:8085/renameFolder', {
    responseType: 'text',
    params: {
      oldName:this.oldname,
      newName:this.newname,
     },
    observe: "response"

  })
  .subscribe((response) => {
    this.t=response.body
      if(this.t=="true"){
        alert('Folder renamed Successfully!!');
      }else{
        alert('This Name IS Already In Use!! Please Enter A Different Name!!');
      }
  
    console.log("bob");   
})
 }
 DELETFOLDER(){
  this.http.delete('http://localhost:8085/deleteFolder', {
    responseType: 'text',
    params: {
      folderName:this.folderdeleted,
     
     },
    observe: "response"

  })
  .subscribe((response) => {
    this.t=response.body
      if(this.t=="true"){
        alert('Folder removed Successfully!!');
      }else{
        alert('Not Exist Folder!!');
      }
  
    console.log("ttttttttttttt");   
})
 }
 moveemail(){
   this.okmove()
  console.log("ttttt"+this.selectedid);  
  this.http.get('http://localhost:8085/move', {
    responseType: 'text',
    params: {
      id:this.selectedid,
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
      console.log("ttttt"+this.id);   
    console.log("uuuuuu");   
})
 }
 /////////pagenumber
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
       this.message_reciv=item.receiver;
       this.sub=item.subject;
     }
   }
   this.clickinbox();
  this.selectedid.push(id);
  console.log("sa7777");
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

ff:any
getnamefolder(y:any){
  this.IIInbox=[]
  console.log(y);
  this.ff=y;
  this.test();
 return y;
}
  test(){
    
    console.log("zoz")
   this.http.get('http://localhost:8085/getMails', {
     responseType: 'json',
     params: {
      folderName:this.ff, 
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
  folders:any[]=[];
  
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
    this.renameFolder();
    this.getFolders();//////////////////////
  }
  folderdeleted:any
  okdelete(){
    this.folderdeleted = (<HTMLInputElement>document.getElementById("deletename")).value;
    if(this.folderdeleted===''){
      alert("please enter the name of old folder and new ");
    }else{
      this.box = document.getElementById("delete-menu");
      this.box.style.display="none";
      console.log(this.folderdeleted);
       this.DELETFOLDER();
       this.getFolders();
    }
   
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
selection:any[]=[]; 
getselection(){ 
  this.selection=[]; 
  for(let i=0;i< this.IIInbox.length;i++){
     if(this. IIInbox[i].selected===true) 
     this.selection.push(this. IIInbox[i].id); } }
foldermove:any
idd:any
okmove(){
  //this.idd=this.getindex();
  this.foldermove = (<HTMLInputElement>document.getElementById("movename")).value;
  if(this.folderdeleted===''){
    alert("please enter the name of old folder and new ");
  }
  this.box = document.getElementById("move-menu");
  this.box.style.display="none";
  console.log(this.foldermove);
  //this.getindex(this.id);
 // this.moveemail();
  
  //foldermove >>> send to backend
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
  

}
