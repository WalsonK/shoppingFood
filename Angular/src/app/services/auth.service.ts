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


  registerUser(houseOwner: boolean, firstName: string, lastName: string, email: string, password: string){
    return this.http.post('http://localhost:8001/register', { houseOwner, firstName, lastName, email, password });
  }


  loginUser(email: string, password: string){
    //var headers_object = new HttpHeaders().set("Authorization", "Bearer "+ "lol");  {headers: headers_object}
    return this.http.post<UserLogin>('http://localhost:8001/login', {email, password}, {headers: this.headers})
  }

  getDashboard(id: number){
    return this.http.post('http://localhost:8001/home', {id}, {headers: this.headers})
  }
  firstConnection(id: number, pseudo: string, alert:boolean, lowQuant: number, memberPseudo: string, memberStatut: boolean){
    return this.http.post('http://localhost:8001/firstConnect', {id, pseudo, alert, lowQuant, memberPseudo, memberStatut}, {headers: this.headers})
  }

  updateUser(id: number, email: string, firstName: string, lastName: string, pseudo: string, hash: string, alert: boolean, lowQuant:number){
    //console.log('ok');
    return this.http.post('http://localhost:8001/updateUser', {id, email, firstName, lastName, pseudo, hash, alert, lowQuant}, {headers: this.headers})
  }

  logout() {
    // remove user from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

//Rooms
  getRooms(id: number){
    return this.http.post('http://localhost:8001/getRooms', {id}, {headers: this.headers})
  }
  createRoom(id: number, roomName: string, lastModif: string){
    return this.http.post('http://localhost:8001/createRoom', {id, roomName, lastModif}, {headers: this.headers})
  }
  deleteRoom(id:number, idHouse: number, idRoom: number){
    return this.http.post('http://localhost:8001/deleteRoom', {id, idHouse, idRoom}, {headers: this.headers})
  }
  updateRoom(id:number, roomName:string, lastModif: string, idHouse: number, idRoom: number){
    return this.http.post('http://localhost:8001/updateRoom', {id, roomName, lastModif, idHouse, idRoom}, {headers: this.headers})
  }

  //Items
  getItems(id:number, roomId: number){
    return this.http.post('http://localhost:8001/getItems', {id, roomId}, {headers: this.headers})
  }
  createItem(id: number, idRoom: number, itemName:string, itemMaxQuant: number, imgSrc:string){
    return this.http.post('http://localhost:8001/createItem', {id, idRoom, itemName, itemMaxQuant, imgSrc}, {headers: this.headers})
  }
  deleteItem(id: number, itemId: number, roomId: number){
    return this.http.post('http://localhost:8001/deleteItem', {id, itemId, roomId}, {headers: this.headers})
  }
  updateItem(id: number, itemName:string, quant:number, itemId: number, roomId: number){
    return this.http.post('http://localhost:8001/updateItem', {id, itemName, quant, itemId, roomId}, {headers: this.headers})
  }

  //Shop List
  getShopList(id:number){
    return this.http.post('http://localhost:8001/getShopList', {id}, {headers: this.headers})
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
