import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
  }
  file:File[]=[]
  topic:any
  mail:any= new Map();
  subject:any
ArrayOfSelectedFile = new Array<any>();
files= new Array<any>();
to=''
priority:any;
recieve=new Array<any>();
t: any
  onFileUpload(event:any){
    this.file=event.target.files
    if(this.file){
      for(let j=0;j<this.file.length;++j){
        this.ArrayOfSelectedFile.push(this.file[j])
        let f={}
          f=this.file[j];
          this.files.push(f)
      } 

    }
    event.target.value=null;
    }
    pdf:any
    viewFile(file:any){
      const d= window.URL.createObjectURL(file);
       this.pdf=window.open();
       this.pdf.location.href = d;
    }
      
    send(x:string){

      this.to=((<HTMLInputElement>document.getElementById("toInput")).value)
      this.recieve=this.to.split(',');
      this.topic=(<HTMLInputElement>document.getElementById("mailInput")).value
      this.subject=(<HTMLInputElement>document.getElementById("subInput")).value  
      this.priority=(<HTMLInputElement>document.getElementById("priority")).value  
      // this.file.push((<HTMLInputElement>document.getElementById("filesss")).value)
      if(this.recieve === []){
        if(x=="draft"){
          this.recieve[0]="+";
          this.draft()
        }
        else{
        alert('enter at least one reciever..');
        return;}
      }else if(this.topic === ''){
        if(x=="draft"){this.draft()}
        else{
        alert('enter body or attachments');
        return;}
      }
      else if(this.priority===''){
        if(x==="draft") {
          this.priority='0';
          this.draft();}
        else {alert('enter priority');
      return;}
      }
      else if(this.files.length===0){
        if(x==="draft") {

          this.draft();}
        else {alert('enter priority');
      return;}
      }
      else {
        this.mail['to'] = this.recieve;
        this.mail['subject'] = this.subject;
        this.mail['body'] = this.topic;
        this.mail['attachments']=this.files;
        this.mail['prioprity']=this.priority;
        console.log(this.mail);
        if(x=="compose"){
          this.compose();}
        else{
           this.draft();}
      }
    }
    
    compose() {

      this.http.get('http://localhost:8085/compose', {
        responseType: 'text',
        params: {
          receivers: this.recieve,
          subject: this.subject,
          body: this.topic,
          priority:this.priority,
          attachments:this.files
        },
        observe: "response"
  
      })
        .subscribe((response) => {
          this.t = response.body
          if (this.t == "true") {
            alert('Message Sent Successfully!!');
            this.router.navigate(["/home"]);
          } else {
            alert('The Reciever Email Cannot Be Found!! Message Isnot Sent Successfully!!');
          }
  
          console.log("bob");
        })
  
    }
    draft() {
       
      this.http.get('http://localhost:8085/draft', {
        responseType: 'text',
        params: {
          receivers: this.recieve,
          subject: this.subject,
          body: this.topic,
          priority:this.priority,
          attachments:"Bassant"
        },
        observe: "response"
  
      })
        .subscribe((response) => {
          this.t = response.body
          if (this.t == "true") {
            alert('Message Saved To Draft!!');
          } else {
            alert('The Reciever Email Cannot Be Found!! Message Isnot Sent Successfully!!');
          }
  
          console.log("bob");
        })
  
  
  
    }
  
  
  
    sendFile() {
      const formData = new FormData();
      for (let i = 0; i < this.file.length; i++) {
        formData.append('file', this.file[i])
      }
    }
    back(){
      this.router.navigate(["/home"]);
    }
    removeFile(index:any){
      this.files.splice(index,1)
      console.log('file removed');
    }
   
    
    }
