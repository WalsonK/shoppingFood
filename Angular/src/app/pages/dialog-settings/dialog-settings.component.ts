import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {


  public darkMode:boolean = false;
  darkModeToggle = new FormControl({ value: '', disabled: true });
  public paiement:boolean = true;


  public userData: {
      email: string,
      firstName: string,
      lastName: string,
      pseudo: string,
      hash: string,
      alert: boolean,
  };

    //CREDIT CARD
public numeroCard:string;
public monthCard: number;
public yearCard: number;
public cvv: number;
public cardEdit : boolean = false;

  public lowQuant: number;


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

  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {email: string, firstName: string, lastName: string, pseudo: string, hash: string, isAlertActivate: boolean, lowQuant:number, numeroCard: string, monthCard: number, yearCard: number, cvv: number},
   private auth: AuthService,
   private router: Router) { 

    //Data to send
    this.userData = {
      email: this.data.email,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      pseudo: this.data.pseudo,
      hash: this.data.hash,
      alert: this.data.isAlertActivate,
    };
    this.lowQuant = this.data.lowQuant;

    this.numeroCard = this.data.numeroCard;
    this.monthCard = this.data.monthCard;
    this.yearCard = this.data.yearCard;
    this.cvv = this.data.cvv;

    console.log(this.numeroCard);
  }

  ngOnInit(): void {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
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

  
  editCard(){
    //card modifing statut
    this.cardEdit = true;
  }
  validateCard(){
    //this.cards[id].isEdit = false;
    //console.log(this.cards[id].cvv);
    this.cardEdit = false;
  }
  userLogout(){
    this.auth.logout();
    this.dialogRef.close();
    this.router.navigate(['/connexion']);
  }

}
