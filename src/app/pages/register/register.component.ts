import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss','./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;

  constructor(private activitedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activitedRoute.queryParams.subscribe(param => {
      if (param.email !== undefined) {
          this.email = param.email
      }
      console.log(this.email);
    });

  }

}
