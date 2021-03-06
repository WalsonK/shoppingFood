import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DialogSettingsComponent } from 'src/app/pages/dialog-settings/dialog-settings.component';
import { LoadingcardComponent } from 'src/app/pages/loadingcard/loadingcard.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MyTeam } from 'src/app/interfaces/my-team'; //Myteam interface
import { UserLogin, UserRegister } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  globalLoading:boolean = true;

  isFirstConnection:boolean;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  hash: string;
  isAlertActivate: boolean;
  isDarkMode: boolean = false;
  isAutomaticPaiement: boolean = false;
  lowQuant: number;
  isHouseOwner: boolean;

  //CREDIT CARD
  numeroCard:string;
  monthCard: number;
  yearCard: number;
  cvv: number;

  darkModeToggle = new FormControl({ value: '', disabled: true });

  myControl = new FormControl();
  options: string[]; //=['One', 'Two', 'Three'];

  filteredOptions: Observable<string[]>;

  //Sans APi mais a remplacer ! --- myTeam<Users>
  member: string;
  myTeam: MyTeam[] = [];
  memberPseudo: string;
  memberStatut: boolean;

  constructor(public dialog : MatDialog, private auth: AuthService, private snackBar: MatSnackBar, private router: Router) {
    //Get Id
    this.userId = parseInt(localStorage.getItem('userId'), 10);

    //get data User
    this.auth.getDashboard(this.userId).subscribe((data: any) =>{
      if(data.error) {
        console.log('Connexion échouée :' + data.message);
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
        this.router.navigate(['/connexion']);
      }else{
        console.log('Ok redirect home works good !' );
        this.email = data.userEmail;
        this.firstName = data.userFirstName;
        this.lastName = data.userLastName;
        this.pseudo = data.userPseudo;
        this.lowQuant = data.userlowQuant;
        this.options = data.usersPseudo;
        const houseOwner = data.houseOwner;
        
        //Credit card from db
        this.numeroCard = '***'+ data.houseData[0].numeroCard.substring(12);
        this.monthCard = data.houseData[0].monthCard;
        this.yearCard = data.houseData[0].yearCard;
        this.cvv = data.houseData[0].cvv;

        //L'utilsateur possède une maison ?
        if(houseOwner != null){
          this.isHouseOwner = true;
        }
        else
          this.isHouseOwner = false;

        //First Connection
        if(data.firstConnection){
          this.isFirstConnection = true;
          //Temps de chargement 
          setTimeout(() => {
            this.globalLoading = false;
          }, 2000);
        }else{
          this.isFirstConnection = false;
          //Temps de chargement 
          setTimeout(() => {
            this.globalLoading = false;
          }, 2000);
        }

        if(data.isAlertActivate)
          this.isAlertActivate = data.isAlertActivate;
        
      }
    });

   }

  ngOnInit(): void {

    // Permet l'autocompletation d'ajout d'user lorsque première fois sur le site
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
    );

  }
//First Connection
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addOnTeams(){
    this.member = this.member.trim();
    if(this.member != ''){
      this.myTeam.push( { name:this.member,statut:'Simple',isAdmin:false } ); // Ajoute membre à team
      this.member = ''; //Reset Input
    }
  }
  switchStatut(index){
    console.log('Before :' + this.myTeam[index].statut);
    if(this.myTeam[index].statut == 'Simple'){
      this.myTeam[index].statut = 'Admin';
      this.myTeam[index].isAdmin = true;
    }
    else if(this.myTeam[index].statut == 'Admin'){
      this.myTeam[index].statut = 'Simple';
      this.myTeam[index].isAdmin = false;
    }
    console.log('After : ' +this.myTeam[index].statut);
      
  }

  // Dashboard Home 
  startDashboard(){
   this.memberPseudo = this.myTeam[0].name;
   this.memberStatut = this.myTeam[0].isAdmin;
   
   this.auth.firstConnection(this.userId, this.pseudo, this.isAlertActivate, this.lowQuant, this.memberPseudo, this.memberStatut).subscribe((data: any) =>{
    if(data.error) {
      const snackBarRef = this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      snackBarRef.afterDismissed().subscribe(() => {
        document.location.reload(true);
      });
    }else{

      const snackBarRef = this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
      snackBarRef.afterDismissed().subscribe(() => {
        document.location.reload(true);
      });
    }
   });
    
  }
  openDialogSettings(){
    let dialogRef = this.dialog.open(DialogSettingsComponent,{
      height: '90%',
      width: '80%',
      data: { 
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        pseudo: this.pseudo,
        hash: this.hash,
        isAlertActivate: this.isAlertActivate,
        lowQuant: this.lowQuant,
        numeroCard: this.numeroCard,
        monthCard: this.monthCard,
        yearCard: this.yearCard,
        cvv: this.cvv
       },
    });

    dialogRef.afterClosed().subscribe(result => {
      var isNumb = typeof result;
      // if response est low quant
      if(isNumb == 'number'){
        if(result != this.lowQuant){
          //update lowQuant in local 
          this.lowQuant = result;

          // update in bdd
          this.auth.updateLowQuant(this.userId, this.lowQuant).subscribe((data:any) =>{
            if(data.error){
              this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
            }else{
              this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
            }
          });
        }
      }else{ // if response is user data
        if(result != undefined){
          //update data in Local !
          this.email = result.email;
          this.firstName = result.firstName;
          this.lastName = result.lastName;
          this.pseudo = result.pseudo;
          this.isAlertActivate = result.alert;
          
          this.lowQuant = result.lowQuant;

          

          //Check password
          if(result.hash != undefined){
            result.hash.trim();
            if(result.hash.length >4){
              this.hash = result.hash;
            }
          }
  
          //update data for bdd !
          this.auth.updateUser(this.userId,this.email, this.firstName, this.lastName, this.pseudo, this.hash, this.isAlertActivate, this.lowQuant).subscribe((data: any) =>{
            if(data.error) {
              console.log('Modification échouée :' + data.message);
              this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
            }else{
              this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
            }
          })
        }else{
          console.log('Pas de modif ! ')
        }
      }
    })
  }


}
