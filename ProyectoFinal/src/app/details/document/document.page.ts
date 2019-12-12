import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Document, Status } from '../../models/documents';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

  public document : Document;
  public est : Status[];

  public documento = "";
  public estatus = "";
  public mensaje = "";
  public observacion = ""

  public documentos = [
    ["CERTIFICADO","Certificado"],
    ["FOTO","Foto"],
    ["NSS","Tarjeta NSS"],
    ["CLINICOS","Analisis Clinicos"],
    ["COMPROBANTE", "Recibo de Pago"],
    ["CURP","Curp"],
    ["ACTA","Acta de Nacimiento"],
    ["CONTRATO","Contrato"],
    ["SOLICITUD","Solicitud"]];
  public status = [ 
    ["EN PROCESO","warning"],
    ["RECHAZADO","danger"],
    ["VALIDADO","default"],
    ["ACEPTADO","success"]
  ];

  constructor(private actroute: ActivatedRoute, private router: Router, private alertCtrl: AlertController) { 
    this.actroute.queryParams.subscribe(
      params => {
        if (params && params.special) {
          this.document = JSON.parse(params.special) as Document;
          this.est = this.document.status
          console.log(this.document);
        }
      }
    );
  }

  ngOnInit() {
    this.documentos.forEach(element => {
      if (this.document.filename.includes(element[0])) {
        this.documento = element[1];
    }});
    this.document.status.forEach(element => {
      if (element.active) {
        this.estatus = element.name;
        this.mensaje = element.message;
        if (element.observation) {
          this.observacion = element.observation;
        }
      }
    });
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

  async detalleStatus(e:Status) {
    const f = e.date.split("T")
    const fyh = f[0] +" - "+f[1].substr(0,8);
    var msg = e.message;
    if (e.observation) {
      msg = msg +" - "+e.observation;
    }
    const alert = await this.alertCtrl.create({
      header: e.name,
      subHeader: fyh,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
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
