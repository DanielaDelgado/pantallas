import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user'
import { Student } from '../models/student'
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NgForm, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms/'
import { createOfflineCompileUrlResolver } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //variables de los modelos de datos de estudiante, form, y usuario(usuario es utilizado para loggeo nc y pass)
  public myForm: FormGroup;
  public user: User;
  public student: Student
  public result = true;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      nc: [""],
      nip: [""]
    });
    console.log("Init");
  }
  //FUNCION DE LOGIN 
  onLogin() {
    this.user = {
      //SE RECIBEN LOS VALORES DEL FORM EN ESTE CASO EL NC Y EL PASS
      nc: this.myForm.value.nc,
      nip: this.myForm.controls.nip.value
    }

    console.log(this.user);
    //SE MANDA LLAMAR EL SERVICIO LOGIN JUNTO CON EL METODO EL CUAL RECIBE AL MODELO USER

    this.loginService.loginUser(this.user).subscribe(
      res => {
        //AQUI SE OBTIENE LOS DATOS (STUDENT) TOKEN Y ID PARA SER MOSTRADOS, AUN NO SE IMPLEMENTA LA RUTA PARA MANDAR 
        //A LA OTRA VENTANA, PERO IGUAL DEBERIA OBTENER LOS DATOS
        console.log("Peticion");
        //this.result = true;
        
        
        console.log("Estudiante");
        console.log(this.student);
       
        console.log(this.loginService.token);
        console.log(this.loginService.id);

          this.student = res;
          this.loginService.studentDatos = this.student;
          this.loginService.token = res.token;
          this.loginService.id = res.user.student._id;
          console.log('successfu.rlly logged user');
          this.router.navigateByUrl('/usuario');
          console.log("dato correcto");
          this.result =true
      }, err => { 
        console.log(err);
        console.log("dato incorrecto ");
        this.result = false;
         /* const alert = this.alertCtrl.create({
            header: 'Datos incorrectos',
            message: "los datos son incorrectos",
            buttons: [
              {
                text: 'salir',
              }
            ]
          });*/
      }
    )


    //intento
    //const user:any= this.loginService.loginUser(this.user);
    //console.log(user);
    /*
      alert;
    }*/
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