import { Component } from '@angular/core';

import { ApirestService } from '../services/apirest.service';
import { AlertController } from '@ionic/angular';
import { Documents } from '../models/documents';
import { Student } from '../models/student';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public student: Student;
  public documents: Documents;
  public documentos = [
    [0,"",false,"CERTIFICADO","Certificado"],
    [0,"",false,"FOTO","Foto"],
    [0,"",false,"NSS","Tarjeta NSS"],
    [0,"",false,"CLINICOS","Analisis Clinicos"],
    [0,"",false,"COMPROBANTE", "Recibo de Pago"],
    [0,"",false,"CURP","Curp"],
    [0,"",false,"ACTA","Acta de Nacimiento"],
    [0,"",false,"CONTRATO","Contrato"],
    [0,"",false,"SOLICITUD","Solicitud"]];
  public status = [ 
    ["EN PROCESO","warning"],
    ["RECHAZADO","danger"],
    ["VALIDADO","default"],
    ["ACEPTADO","success"]
  ];


  constructor(private api: ApirestService, private router: Router, private alertCtrl: AlertController) {
    if (this.api.student == null) {
      this.router.navigateByUrl('/login');
    }else{
      this.student = this.api.student;
    }
    this.api.statusDocument().subscribe(
      res => {
          this.documents = res;
          this.asignarDocumento();
      }, err => { 
        this.router.navigateByUrl('/login');
      }
    );
  }

  asignarDocumento(){
    for (let i = 0; i < this.documentos.length; i++) {
      const element = this.documents.documents[i];
      for (let index = 0; index < this.documentos.length; index++) {
        console.log(element.filename + ", "+ this.documentos[index][3])
        if (element.filename.includes(this.documentos[index][3] as string)) {
          this.documentos[index][0] = i;
          this.documentos[index][2] = true;
          element.status.forEach(element => {
            if (element.active) {
              this.documentos[index][1] = element.name;
            }
          });
          break
        }
      }
    }
  }

  colorStatus(status:string): string{
    var color = "";
    this.status.forEach(element => {
      if (status == element[0]) {
        color = element[1];
      }
    });
    return color;
  }

  detalleDocumento(id: number){
    var doc = this.documents.documents[id]
    let navext: NavigationExtras = {
      queryParams:{
        special: JSON.stringify(doc)
      }
    };
    this.router.navigate(['/document'], navext);
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
