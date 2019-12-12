import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApirestService } from '../services/apirest.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApirestService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      nc:["", Validators.compose([Validators.required, ,Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]{8}')])],
      nip:["", Validators.compose([Validators.required,Validators.minLength(3)])]
    });
  }

  onLogin(){
    const nc = this.myForm.controls.nc.value;
    const nip = this.myForm.controls.nip.value;
    this.api.loginStudent(nc,nip).subscribe(
      res => {
          this.api.student = res;
          this.router.navigateByUrl('/tabs');
      }, err => { 
        this.presentAlert('Datos Incorrectos', 'No se ha logrado iniciar sesión', err.error.error);
      }
    );
  }

  async presentAlert(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

}
