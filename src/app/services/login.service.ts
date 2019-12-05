import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Student} from '../models/student';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public post:any;
  public token:string;
  public id:string;
  public studentDatos:Student;
  constructor(public http:HttpClient) { }
  
  header: HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json"
   
  });
  API_URI="http://104.248.94.77/api/v1";
  loginUser(user:User){
    
    return this.http.post<Student>(`${this.API_URI}/user/student/login`,user)

  }
/*
  setUser(user: User): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }
  */
}
