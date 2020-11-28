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
  houseOwner: boolean = false;


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
     //Trim
    this.lastName = this.lastName.trim();
    this.firstName = this.firstName.trim();
    this.email = this.email.trim();
    this.password = this.password.trim();

    //email REgex
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var mailValid = re.test(this.email)

    // Verifie champ remplis
    if(this.firstName === ''){
      this.snackBar.open('Veuillez renseignez votre prénom !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    }else if(this.lastName === ''){
      this.snackBar.open('Veuillez renseignez votre nom !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    }else if(this.email === ''){
      this.snackBar.open('Veuillez renseignez votre e-mail !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    } else if(this.password === ''){
      this.snackBar.open('Veuillez renseignez un mot de passe !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    }else if(this.houseOwner === undefined){
      this.snackBar.open('Veuillez renseignez si vous possedez une maison !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    }
    else {

      //Verif. Email
      if(!mailValid){ 
        this.snackBar.open('Votre E-mail est invalide !','',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{

        //Register
        this.auth.registerUser(this.houseOwner, this.firstName, this.lastName, this.email, this.password).subscribe((data: UserRegister) => {
          if (data.error) {
            console.log('Inscription échouée : '+ data.message);
            this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
          }else {
            console.log('Goooood boy !!! ' + data.message);
            let snackBarRef = this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});

            snackBarRef.afterDismissed().subscribe(() => {
              this.reloadPage();
            });
          }
        }); 
      }
    }
  }

}
