import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  registerUser(name: string, email: string, password: string){
    return this.http.post('http://localhost:8001/register', { name, email, password});
  }

  loginUser(email: string, password: string){
    return this.http.post('http://localhost:8001/login', {email, password});
  }
}
