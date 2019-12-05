import { Component,OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {User} from '../models/user'
import {Student} from '../models/student'

import { Router } from '@angular/router';
import { from } from 'rxjs';
import {NgForm, FormGroup,FormBuilder,ReactiveFormsModule} from '@angular/forms/'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
   public myForm:FormGroup;
   public user:User;
   public student:Student
   public result=true;

  constructor(private loginService: LoginService,private router:Router,private fb:FormBuilder) {}
  
  ngOnInit(){
    this.myForm=this.fb.group({
      nc:[""],
      password:[""]
    })
  
   }
  onLogin(){
    this.user={
      nc:this.myForm.value.nc,
      password:this.myForm.controls.password.value
    }
    this.loginService.loginUser(this.user).subscribe (
      res=>{
        this.result=true;
        this.student=res;
        this.loginService.studentDatos=this.student;
        console.log(this.student);
        this.loginService.token=res.token;
        this.loginService.id=res.user.student._id;
        console.log(this.loginService.token);
        console.log(this.loginService.id);
      },err=>this.result=false
    )
  }


  /*
  onLogin() {
     this.user={
      nc:this.myForm.value.nc,
      password:this.myForm.controls.password.value
     }
     this.loginService.loginUser(this.user.nc,this.user.password).subscribe(
       data=>{
        console.log(data);
       }
     );
       
  }*/
}
