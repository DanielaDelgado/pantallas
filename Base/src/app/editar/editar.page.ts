import { Component, OnInit } from '@angular/core';
import {Student} from '../models/student';
import {User} from '../models/user';
import {LoginService} from '../services/login.service'
import { from } from 'rxjs';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

 
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  public student:Student;
  public user:User;
  public result=true;
  public myForm: FormGroup;

  constructor(private service:LoginService,  private fb:FormBuilder,  private actroute: ActivatedRoute, 
    private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.student=this.service.studentDatos;
    console.log(this.student);

     this.myForm=this.fb.group({
      firstName:["", Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      fatherLastName:["", Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      motherLastName:["", Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      sex:["", Validators.required],
      email:["",Validators.required],
      civilStatus:["",Validators.required],
      city:["",Validators.required],
      state:["",Validators.required],
      cp:["",Validators.required],
      phone:["",Validators.required],
      suburb:["",Validators.required],
      street:["",Validators.required],
      etnia:["",Validators.required],
      originSchool:["",Validators.required],
    });
  
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
  update(student:Student){
    student.user.student.firstName=this.myForm.controls.firstName.value;
    student.user.student.fatherLastName=this.myForm.controls.fatherLastName.value;
    student.user.student.motherLastName=this.myForm.controls.motherLastName.value;
    student.user.student.sex=this.myForm.controls.sex.value;
    student.user.student.email=this.myForm.controls.email.value;
    student.user.student.civilStatus=this.myForm.controls.civilStatus.value;
    student.user.student.city=this.myForm.controls.city.value;
    student.user.student.state=this.myForm.controls.state.value;
    student.user.student.cp=this.myForm.controls.cp.value;
    student.user.student.phone=this.myForm.controls.phone.value;
    student.user.student.suburb=this.myForm.controls.suburb.value;
    student.user.student.street=this.myForm.controls.street.value;
    student.user.student.etnia=this.myForm.controls.etnia.value;
    student.user.student.originSchool=this.myForm.controls.originSchool.value;
     this.service.updateStudent(student,student.user.student._id);
     alert('cambios guardados');
     //this.router.navigate(['../tabs/tab2']);
   }

}
