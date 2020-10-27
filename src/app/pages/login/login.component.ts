import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  redirectRegister(){
    //redirection
    console.log('redirect work !!');
    this.router.navigate(['/inscription', { email: this.email }]);
  }

  login() {
    //login
    console.log(this.email);
    
}

}
