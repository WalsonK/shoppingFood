import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { DialogSettingsComponent } from 'src/app/pages/dialog-settings/dialog-settings.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
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
