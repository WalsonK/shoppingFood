import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserLogin, UserRegister } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  loginEmail: string;
  loginPassword: string;
  isLoginTemplate = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar) { 
      
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
    console.log(this.loginEmail, this.loginPassword);
    this.auth.loginUser(this.loginEmail, this.loginPassword).subscribe((data: UserLogin) => {
      if(data.error) {
        console.log('Connexion échouée :' + data.message);
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      } else {
        console.log('Goooood boy !!! ' + data.message);
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
        localStorage.setItem("token", data.token);
        
        localStorage.setItem("userId", String(data.userId));
        
        if (data.token) {
          //window.location.href="/ma-maison";
          //this.auth.redirectDashboard()
          this.router.navigate(['/ma-maison/']);
      }
        //return headers.get('Authorization') === 'Bearer fake-jwt-token';

      }
    })
  }

}
