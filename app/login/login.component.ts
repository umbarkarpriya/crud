import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm:any;
public temp:any;
isSubmitted:boolean=false;
  constructor(private fb:FormBuilder,private serve:DataService,private route:Router) {
    this.loginForm = this.fb.group({
      name:['',[Validators.required]],
      empId:['',[Validators.required]]
    });

    this.getData();
   }

   getData(){
     this.serve.getAllData().subscribe((res)=>{
       console.log(res);
this.temp=res;
     })
   }

  ngOnInit(): void {
  }

  submitForm(){
  console.log(this.loginForm.value.name);
  for(let i=0;i<this.temp.length;i++){
    // console.log(this.temp[i].role);
    // console.log(this.loginForm.value.empId);

    if((this.loginForm.value.name == this.temp[i].name) && (this.temp[i].role == 'user')){
      console.log('user found');
      console.log(this.temp[i]);
       this.serve.setMessage(this.temp[i].id,this.temp[i]);
       this.route.navigate(['user']);
    }else if(this.loginForm.value.name == this.temp[i].name && this.temp[i].role == 'admin'){
      console.log('admin found');
      // console.log(this.temp[i]);
       this.serve.setMessage(this.temp[i].id,this.temp[i]);
       this.route.navigate(['admin']);
    }else{
    //  alert('please rgister if you are new');
      // this.route.navigate(['register']);

    }
  }
  this.isSubmitted =true;
  }

  onSubmit(){

  }
}
