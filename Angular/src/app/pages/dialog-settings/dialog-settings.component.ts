import { Component, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {

  public alert:boolean = true;
  public darkMode:boolean = false;
  public paiement:boolean = true;
  public lowQuant:number = 4;
  
  public tabSelected:string;

  cards = [
    {
      id: 0,
      numero: '***2435',
      expirationDate: Date.now() ,
      cvv: 523,
      isEdit: false
    }
  ];
  historicToasts =[
    {
      modifName: 'Maman',
      modifItem: 'mouchoirs',
      modifQuant: 1,
      modifRoom: 'Salon',
      modifTime: '1 min',
      isMe: false
    },
    {
      modifName: 'Papa',
      modifItem: 'papier Toilet',
      modifQuant: 15,
      modifRoom: 'Salon',
      modifTime: '20 min',
      isMe: true
    },
    {
      modifName: 'Fille',
      modifItem: 'mouchoirs',
      modifQuant: 5,
      modifRoom: 'Salon',
      modifTime: '1 heure',
      isMe: false
    }
  ];

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  openTab(slectedTab){
    // Initialize Div
    const compteDiv = document.getElementById("compteTab");
    const securiteDiv = document.getElementById("secuTab");
    const familyDiv = document.getElementById("familyTab");
    const paraDiv = document.getElementById("paraTab");

    //compte selected
    if(slectedTab == "compte"){
      compteDiv.className = "btn btn-primary";
      securiteDiv.className = "btn btn-light";
      familyDiv.className = "btn btn-light";
      paraDiv.className = "btn btn-light";

      this.tabSelected = slectedTab;
    }
    //secu selected
    if(slectedTab == "secu"){
      compteDiv.className = "btn btn-light";
      securiteDiv.className = "btn btn-primary";
      familyDiv.className = "btn btn-light";
      paraDiv.className = "btn btn-light";

      this.tabSelected = slectedTab;
    }
    //family selected
    if(slectedTab == "family"){
      compteDiv.className = "btn btn-light";
      securiteDiv.className = "btn btn-light";
      familyDiv.className = "btn btn-primary";
      paraDiv.className = "btn btn-light";

      this.tabSelected = slectedTab;
    }
     //family selected
     if(slectedTab == "para"){
      compteDiv.className = "btn btn-light";
      securiteDiv.className = "btn btn-light";
      familyDiv.className = "btn btn-light";
      paraDiv.className = "btn btn-primary";

      this.tabSelected = slectedTab;
    }
      

    console.log('l\'option est : '+this.tabSelected);
    
  }

  
  editCard(id){
    //card modifing statut
    this.cards[id].isEdit = true;
  }
  validateCard(id){
    this.cards[id].isEdit = false;
    console.log(this.cards[id].cvv);
  }
  userLogout(){
    this.auth.logout();
    this.router.navigate(['/connexion']);
  }

}
