import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private reload = new Subject<boolean>();

  sendReloadEvent() {
    this.reload.next(true);
  }

  getReloadEvent(): Observable<any>{ 
    return this.reload.asObservable();
  }
}
