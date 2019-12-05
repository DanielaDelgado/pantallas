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
  //variables de los modelos de datos de estudiante, form, y usuario(usuario es utilizado para loggeo nc y pass)
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
   //FUNCION DE LOGIN 
  onLogin(){
    this.user={
      //SE RECIBEN LOS VALORES DEL FORM EN ESTE CASO EL NC Y EL PASS
      nc:this.myForm.value.nc,
      password:this.myForm.controls.password.value
    }
    //SE MANDA LLAMAR EL SERVICIO LOGIN JUNTO CON EL METODO EL CUAL RECIBE AL MODELO USER

    this.loginService.loginUser(this.user).subscribe (
      res=>{
        //AQUI SE OBTIENE LOS DATOS (STUDENT) TOKEN Y ID PARA SER MOSTRADOS, AUN NO SE IMPLEMENTA LA RUTA PARA MANDAR 
        //A LA OTRA VENTANA, PERO IGUAL DEBERIA OBTENER LOS DATOS
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
