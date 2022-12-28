import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
  }
email:any
pass:any
flag:boolean=false;
signinmap:any
t:any;
signin(){
  this.signinmap =new Map()
  this.email=(<HTMLInputElement>document.getElementById("email")).value
  this.pass=(<HTMLInputElement>document.getElementById("password")).value
  
  this.signinmap['email']=this.email
  this.signinmap['password']=this.pass
  console.log(this.signinmap);
  this.SignIn();
}
SignIn(){
  this.http.get('http://localhost:8085/signIn', {
    responseType: 'text',
    params: {
     email:this.email,
     password:this.pass, 
     },
    observe: "response"

  })
  .subscribe((response) => {
      this.t=response.body
      if(this.t==="true") this.router.navigateByUrl('home');
      else alert("Wrong e-mail or Password!! please check Again.");
      console.log(this.t);
      console.log("bob");   
  })
 
}

}