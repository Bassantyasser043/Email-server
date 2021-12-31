import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
  }
primary_email=new Array<string>();
flag:any="true";
contact_name:any;
contact_list:any;
contact={
  contact_name: "",
  primary_email: [],
}
t:any
addcontact(){
    this.contact_list =new Map()
    this.primary_email[0]=(<HTMLInputElement>document.getElementById("primaryEmail")).value
    this.contact_name=(<HTMLInputElement>document.getElementById("name")).value
    
    console.log(this.contact_list);
    //this.SignIn();
   
    if(this.primary_email==[]){
      alert("Please enter primary Email");
    }
    else if(this.contact_name=="") alert("Please Contact Name");
    else if(this.contact_name==""&&this.primary_email==[]) alert("Unsucessful");
    else{
    this.contact_list['primaryEmail']=this.primary_email
    this.contact_list['name']=this.contact_name
    }
  
}
///////
Finished(){
  this.addcontact();
  console.log("hiiiiiiiiii")
  console.log(this.contact_name + " "+this.primary_email);
  this.http.get('http://localhost:8085/addContact', {
      responseType: 'text',
      params: {

        name:this.contact_name,
        email:this.primary_email

      },
      observe: "response"

    })
      .subscribe((response) => {
        this.flag=response.body
       
      })

  if(this.flag==="true"){
    alert("Sucessful operation");
    this.router.navigateByUrl("/home");
  }
  this.getcontacts();
}
back(){
  this.router.navigate(["/home"]);
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
       
       
         //this.contact.=item.receiver;
         console.log(this.contact.contact_name +"name")
         //this.contact.primary_email=item.sender;
         console.log(this.contact.primary_email)
         
     
      }) 
}
}