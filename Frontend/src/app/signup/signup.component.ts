import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
  }

  user:any
  fname:any
  lname:any
  email:string="";
  date="2000-01-01";
  password:string="";
  test:any;
 
  submit(){
    this.fname=(<HTMLInputElement>document.getElementById("fname")).value
    this.lname=(<HTMLInputElement>document.getElementById("lname")).value
    this.password=(<HTMLInputElement>document.getElementById("password")).value
    this.email=(<HTMLInputElement>document.getElementById("address")).value
    this.date=(<HTMLInputElement>document.getElementById("birthday")).value
    if(this.fname === ""){
      document.getElementById('fname');
      alert('first name missing');
      return;
    }else if(this.lname === ""){
      document.getElementById('lname');
      alert('last name missing');
      return ;
    }else if(this.email === "") {
      document.getElementById('address');
      alert('address  missing');
      return;
    }else if(this.password.length<8){
      document.getElementById('password');
      alert('too short password');
      return;
    }else {
       this.user = new Map();
      this.user['password'] = this.password;
      this.user['address'] = this.email;
      this.user['date'] = this.date; 
      this. user['firstname'] = this.fname;
      this.user['lastname'] = this.lname;
      console.log(this.user);
      this.createaccount();
     
    }
     
  }
  createaccount(){
    this.http.get('http://localhost:8085/signUp', {
      responseType: 'text',
      params: {
       name:this.fname,
       email:this.email,
       password:this.password, 
       },
      observe: "response"
  
    })
    .subscribe((response) => {
        this.test=response.body
        console.log(this.test);
        console.log("bob");   
        if(this.test==="true") alert("Sucessful Sign Up. please Login.");
        else alert("This email has been registered before, please Login.");
    })
   
  }
  
}
