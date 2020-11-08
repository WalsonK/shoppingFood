import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserRegister } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss','./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() email: string;
  name:string;
  password:string;


  constructor(private activitedRoute: ActivatedRoute, private auth: AuthService) { 
    
  }

  ngOnInit(): void {
    console.log(this.email);

  }

  reloadPage(){
    document.location.reload(true);
  }

  register(): void {
    // Verification des données saisie. (Vérif. email, champs remplis - trim, ...)
    this.auth.registerUser(this.name, this.email, this.password).subscribe((data: UserRegister) => {
        if (data.error) {
            console.log('User don\'t register');
        } else {
            console.log('Goooood boy !!!');
        }
    });
  }

}
