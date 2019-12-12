import { Component, OnInit } from '@angular/core';

import { ApirestService } from '../services/apirest.service';
import { AlertController } from '@ionic/angular';
import { Student } from '../models/student';
import { Router } from '@angular/router';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public student: Student;
  public foto: String;
  public existeFoto = false;

  constructor(private api: ApirestService, private router: Router, private alertCtrl: AlertController, private camera: Camera) {
    if (this.api.student == null) {
      this.router.navigateByUrl('/login');
    }else{
      this.student = this.api.student;
      this.buscarfoto()
    }
  }
  buscarfoto(){
    this.api.statusDocument().subscribe(
      res => {
            var fileid = "";
            var filename = "";
          res.documents.forEach(element => {
            if (element.filename.includes("FOTO")) {
              fileid = element.fileIdInDrive;
              filename = element.filename;
              //
              this.api.foto_fileidindrive = fileid;
            }
          });
          this.api.getPhoto(fileid,filename).subscribe(
            res => {
                this.foto = res.file;
                this.existeFoto = true;
                this.api.foto_newf = false;
            }, err => { 
              console.log(err)
              this.existeFoto = false;
            }
          );
      }, err => {
        this.existeFoto = false;
      }
    );
  }

  useCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/png;base64,' + imageData;
     this.updateImage('data:image/png',imageData);
     this.foto=imageData;
    }, (err) => {
     // Handle error
    });
  }

  updateImage(mimetype:string,bodymedia:string){
    this.api.updateFoto(mimetype,bodymedia)
    this.buscarfoto()
  }

  ngOnInit() {
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
