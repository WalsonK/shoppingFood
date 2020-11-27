import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLogin, UserRegister } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<UserLogin>;
  public user: Observable<UserLogin>;
  public headers = new HttpHeaders(
    {
       'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
   );

   constructor(private http: HttpClient, private router: Router) {
    
   }


  registerUser(firstName: string, lastName: string, email: string, password: string){
    return this.http.post('http://localhost:8001/register', { firstName, lastName, email, password });
  }


  loginUser(email: string, password: string){
    //var headers_object = new HttpHeaders().set("Authorization", "Bearer "+ "lol");  {headers: headers_object}
    return this.http.post<UserLogin>('http://localhost:8001/login', {email, password}, {headers: this.headers})
  }

  getDashboard(){
    return this.http.get('http://localhost:8001/home', {headers: this.headers})
  }

  updateUser(email: string, firstName: string, lastName: string,pseudo: string, alert: boolean, lowQuant:number){
    //console.log('ok');
    return this.http.post('http://localhost:8001/updateUser', {email, firstName, lastName, pseudo, alert, lowQuant}, {headers: this.headers})
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.token; // you probably want to store it in localStorage or something

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }

}
