import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserRegister } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss','./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() email: string;
  firstName:string;
  lastName: string;
  password:string;


  constructor(private activitedRoute: ActivatedRoute, private auth: AuthService, private snackBar: MatSnackBar) { 
    
  }

  ngOnInit(): void {

  }

  openSnackBar(message){
    this.snackBar.open(message);
  }

  reloadPage(){
    document.location.reload(true);
  }

  register(): void {
    // Verification des données saisie. (Vérif. email, champs remplis - trim, ...)
    this.auth.registerUser(this.firstName, this.lastName, this.email, this.password).subscribe((data: UserRegister) => {
        if (data.error) {
            console.log('Inscription échouée : '+ data.message);
            this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
        } else {
            console.log('Goooood boy !!! ' + data.message);
            let snackBarRef = this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});

            /*snackBarRef.afterDismissed().subscribe(() => {
              this.reloadPage();
            });*/
        }
    });
  }

}
