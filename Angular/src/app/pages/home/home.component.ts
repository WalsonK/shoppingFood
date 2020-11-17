import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { DialogSettingsComponent } from 'src/app/pages/dialog-settings/dialog-settings.component';
import { LoadingcardComponent } from 'src/app/pages/loadingcard/loadingcard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../login/login.component.scss','./home.component.scss']
})
export class HomeComponent implements OnInit {

  globalLoading:boolean = true;
  isFirstConnection:boolean = true;

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.globalLoading = false;
    }, 5000);
  }


  startDashboaard(){
    this.isFirstConnection = false;
    this.globalLoading = true;

    setTimeout(() => {
      this.globalLoading = false;
    }, 3000);
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
