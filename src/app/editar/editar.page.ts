import { Component, OnInit } from '@angular/core';
import {Student} from '../models/student';
import {User} from '../models/user';
import {LoginService} from '../services/login.service'
import { from } from 'rxjs';
 
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  public student:Student;
  public user:User;
  public result=true;

  constructor(private service:LoginService) { }

  ngOnInit() {
    this.student=this.service.studentDatos;
    console.log(this.student);
  
  }
  getUser(){
  
    //SE MANDA LLAMAR EL SERVICIO LOGIN JUNTO CON EL METODO EL CUAL RECIBE AL MODELO USER

    this.service.loginUser(this.user).subscribe (
      res=>{
        //AQUI SE OBTIENE LOS DATOS (STUDENT) TOKEN Y ID PARA SER MOSTRADOS, AUN NO SE IMPLEMENTA LA RUTA PARA MANDAR 
        //A LA OTRA VENTANA, PERO IGUAL DEBERIA OBTENER LOS DATOS
        //this.nombre=this.student.user.student.controlNumber;
       
        this.result=true;
        this.student=res;
        this.service.studentDatos=this.student;
        console.log(this.student);
        this.service.token=res.token;
        this.service.id=res.user.student._id;
        console.log(this.service.token);
        console.log(this.service.id);
      },err=>this.result=false
    )

  }

}
