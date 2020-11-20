import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DialogSettingsComponent } from 'src/app/pages/dialog-settings/dialog-settings.component';
import { LoadingcardComponent } from 'src/app/pages/loadingcard/loadingcard.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MyTeam } from 'src/app/interfaces/my-team'; //Myteam interface

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  globalLoading:boolean = true;
  isFirstConnection:boolean = true;

  pseudo: string;
  isAlertActivate: boolean = false;
  isDarkMode: boolean = false;
  isAutomaticPaiement: boolean = false;
  lowQuant: number;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  //Sans APi mais a remplacer ! --- myTeam<Users>
  member: string;
  myTeam: MyTeam[] = [];

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
    //Temps de chargement 
    setTimeout(() => {
      this.globalLoading = false;
    }, 4000);

    // Permet l'autocompletation d'ajout d'user lorsque première fois sur le site
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addOnTeams(){
    if(this.member != undefined){
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



  startDashboard(){
   /* this.isFirstConnection = false;
    this.globalLoading = true;

    setTimeout(() => {
      this.globalLoading = false;
    }, 3000);
    */
   console.log('pseudo : '+this.pseudo + '| isAlertActivate : '+ this.isAlertActivate + ' | isdarkMade : ' + this.isDarkMode + ' | isPaiment : '+ this.isAutomaticPaiement + ' | lowQuant = '+ this.lowQuant +' | myTeam :' + this.myTeam);
  }


  openDialogSettings(){
    let dialogRef = this.dialog.open(DialogSettingsComponent,{
      height: '90%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: '+result)
    })
  }

}
