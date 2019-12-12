import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../../services/apirest.service';
import { AlertController } from '@ionic/angular';
import { Student, InfoStudent } from '../../models/student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  public myForm: FormGroup;
  public student: Student;
  public info = new InfoStudent();

  constructor(private api: ApirestService,private alertCtrl: AlertController,  private fb:FormBuilder, private router: Router) { 
    if (this.api.student == null) {
      this.router.navigateByUrl('/login');
    }else{
      this.student = this.api.student;
    }
  }

  ngOnInit() {

    this.myForm = this.fb.group({
      firstName:[this.student.user.student.firstName, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      fatherLastName:[this.student.user.student.fatherLastName, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      motherLastName:[this.student.user.student.motherLastName, Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(20)])],
      birthPlace:[this.student.user.student.birthPlace,Validators.required],
      dateBirth:[this.student.user.student.dateBirth,Validators.required],
      civilStatus:[this.student.user.student.civilStatus,Validators.required],
      email:[this.student.user.student.email,Validators.required],
      curp:[this.student.user.student.curp,Validators.required],
      sex:[this.student.user.student.sex,Validators.required],
      street:[this.student.user.student.street,Validators.required],
      suburb:[this.student.user.student.suburb,Validators.required],
      city:[this.student.user.student.city,Validators.required],
      state:[this.student.user.student.state,Validators.required],
      cp:[this.student.user.student.cp,Validators.required],
      phone:[this.student.user.student.phone,Validators.required],
      etnia:[this.student.user.student.etnia,Validators.required],
      typeEtnia:[this.student.user.student.typeEtnia],
      disability:[this.student.user.student.disability,Validators.required],
      typeDisability:[this.student.user.student.typeDisability],
      originSchool:[this.student.user.student.originSchool,Validators.required],
      otherSchool:[this.student.user.student.otherSchool],
      nameOriginSchool:[this.student.user.student.nameOriginSchool,Validators.required],
      averageOriginSchool:[this.student.user.student.averageOriginSchool,Validators.required],
      nss:[this.student.user.student.nss,Validators.required]
    });

  }

  saveInformation(){

    this.info.firstName = this.myForm.controls.firstName.value;
    this.info.fatherLastName=this.myForm.controls.fatherLastName.value;
    this.info.motherLastName=this.myForm.controls.motherLastName.value;
    this.info.birthPlace=this.myForm.controls.birthPlace.value;
    this.info.dateBirth=this.myForm.controls.dateBirth.value;
    this.info.civilStatus=this.myForm.controls.civilStatus.value;
    this.info.email=this.myForm.controls.email.value;
    this.info.curp=this.myForm.controls.curp.value;
    this.info.sex=this.myForm.controls.sex.value;
    this.info.street=this.myForm.controls.street.value;
    this.info.suburb=this.myForm.controls.suburb.value;
    this.info.city=this.myForm.controls.city.value;
    this.info.state=this.myForm.controls.state.value;
    this.info.cp=this.myForm.controls.cp.value;
    this.info.phone=this.myForm.controls.phone.value;
    this.info.etnia=this.myForm.controls.etnia.value;
    this.info.typeEtnia=this.myForm.controls.typeEtnia.value;
    this.info.disability=this.myForm.controls.disability.value;
    this.info.typeDisability=this.myForm.controls.typeDisability.value;
    this.info.originSchool=this.myForm.controls.originSchool.value;
    this.info.otherSchool=this.myForm.controls.otherSchool.value;
    this.info.nameOriginSchool=this.myForm.controls.nameOriginSchool.value;
    this.info.averageOriginSchool=this.myForm.controls.averageOriginSchool.value;
    this.info.nss=this.myForm.controls.nss.value;

    this.api.updateInfo(this.info).subscribe(
      res => {
        this.api.refresh()
      }, err => { 
      });
  }

  async onLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Atención !!!',
      message: '¿Deseas <strong>Cerrar Sesión</strong> ?',
      buttons: [ 'CANCELAR', {
          text: 'CONFIRMAR',
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });
    await alert.present();
  }

}
