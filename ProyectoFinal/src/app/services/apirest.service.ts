import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Documents, Foto } from '../models/documents';
import { Student, InfoStudent } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class ApirestService {

  public student: Student;
  public documents = new Documents();
  API_URI = "http://104.248.94.77/api/v1";
  public auth;

  constructor(public http: HttpClient) { }

  refresh(){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    this.http.post<Student>(`${this.API_URI}/user/student/login`, this.auth, httpOptions).subscribe(
      res => {
          this.student = res;
      }, err => { 
      }
    );
  }

  loginStudent(nc:String,nip:String) {
    const datos = {
      nc: nc,
      nip: nip
    };
    this.auth = datos;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<Student>(`${this.API_URI}/user/student/login`, datos, httpOptions);
  }

  statusDocument() {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ this.student.token
      })
    };
    return this.http.get<Documents>(`${this.API_URI}/student/get/documents/drive/${this.student.user.student._id}`, httpOptions);
  }

  updateInfo(info:InfoStudent) {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ this.student.token
      })
    };
    return this.http.put(`${this.API_URI}/student/${this.student.user.student._id}`, info, httpOptions);
  }

  getPhoto(fileid:string,filename:string) {
    const datos = {
      fileId: fileid,
      fileName: filename
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ this.student.token
      })
    };
    return this.http.post<Foto>(`${this.API_URI}/drive/get/photo`, datos, httpOptions);
  }

  
  public foto_fileidindrive = ""
  public foto_nameindrive = ""
  public foto_newf = true

  updateFoto(mimeType:string,bodyMedia:string){
    const datos = {
        mimeType: mimeType, 
        nameInDrive: this.student.user.student.controlNumber+"-FOTO.png", 
        bodyMedia: bodyMedia, 
        folderId: this.student.user.student.folderId.idFolderInDrive, 
        newF: this.foto_newf,
        fileId : this.foto_fileidindrive
      };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ this.student.token
      })
    };
    return this.http.post(`${this.API_URI}/drive/upload/file2`, datos, httpOptions);
  }

}
