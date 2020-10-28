import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PersonServiceService } from 'src/app/services/person-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginEmail: string;
  isLoginTemplate = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personService: PersonServiceService
    ) { 
      
    }

  ngOnInit(): void {
  }

  redirectRegister(){
    //redirection
    this.isLoginTemplate = false;
    //this.router.navigate(['/inscription']);
  }

  login() {
    //login
    console.log(this.loginEmail);
    
}

}
