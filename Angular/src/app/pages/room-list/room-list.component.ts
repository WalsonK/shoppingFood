import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogAddRoomComponent } from 'src/app/pages/dialog-add-room/dialog-add-room.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss','../login/login.component.scss']
})
export class RoomListComponent implements OnInit {

  userId: number;
  roomName: string;
  lastModif: string;

  rooms = [];

  constructor(private auth: AuthService, public dialog : MatDialog, private snackBar: MatSnackBar) {
    //Get user ID
    this.userId = parseInt(localStorage.getItem('userId'), 10);
   }

  ngOnInit(): void {
    this.auth.getRooms(this.userId).subscribe((data:any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.rooms = data.roomList;
      }
    })

  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogAddRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: '+result)
      if(result == 'undefined')
      this.snackBar.open('Veuillez renseignez un nom de pièce','',{ duration : 2000, panelClass: 'snackbar-danger'});
      else{
        this.roomName = result;
        this.lastModif = this.getStringDateAndHour();
    
        this.createRoom(this.roomName, this.lastModif);
      }
    });
  }

  getStringDateAndHour(){
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();

    const date = String(day)+'/'+String(month)+'/'+String(year)+' '+hour+'h'+min;
    return date;
  }

  createRoom(roomName,lastModif){
    this.auth.createRoom(this.userId, roomName, lastModif).subscribe((data:any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.rooms = data.roomList;
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
      }
    })

  }

  getRoomListEvent(roomList: Array<any>){
    this.rooms = roomList;
  }

}
