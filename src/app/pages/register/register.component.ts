import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss','./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() email: string;

  constructor(private activitedRoute: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    console.log(this.email);

  }

  reloadPage(){
    document.location.reload(true);
  }

}
