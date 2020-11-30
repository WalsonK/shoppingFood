import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAddItemComponent } from 'src/app/pages/dialog-add-item/dialog-add-item.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  userId: number;
  localRoomName: string;

  @Input() idHouse: number;
  @Input() idRoom: number;
  @Input() roomName: string;
  @Input() isModify: boolean;
  @Input() lastModif: string;

  @Output() roomList = new EventEmitter<Array<any>>();


  items = [];

  constructor(public dialog : MatDialog, private auth: AuthService, private snackBar: MatSnackBar) {
    //Get user ID
    this.userId = parseInt(localStorage.getItem('userId'), 10);
  }

  ngOnInit(): void {
    this.auth.getItems(this.userId, this.idRoom).subscribe((data: any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.items = data.itemsList;
      }
    })
    
  }

  deleteRoom(){
    this.auth.deleteRoom(this.userId, this.idHouse, this.idRoom).subscribe((data:any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        const snackBarRef = this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
          // room list to parent -> room-list component
        this.roomList.emit(data.roomList);
      }
    })
  }

  changeRoomName(){
    this.isModify = true;
    this.localRoomName = this.roomName;
    
    //items modifing statut
    for(let i = 0;i < this.items.length;i++){
      this.items[i].isEdit = true;
    }
  }
  validateChangeRoomName(){
    this.isModify = false;
    if(this.roomName == ''){
      this.roomName = this.localRoomName;
      this.snackBar.open('Veuillez renseignez un nom valable !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    }else{
      //Change last modif date format (JJ/MM/AAAA à HH/mm)
      var d = new Date();
      this.lastModif = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+' à '+d.getHours() + 'h' + d.getMinutes();

      //send change to bdd
      this.auth.updateRoom(this.userId, this.roomName, this.lastModif, this.idHouse, this.idRoom).subscribe((data: any) =>{
        if(data.error) {
          this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
        }else{
          this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
        }
      })
    }

    //items modifing statut
    for(let i = 0;i < this.items.length;i++){
      this.items[i].isEdit = false;
    }
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogAddItemComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result != 'false'|| result != undefined){
        this.createItem(result.itemName, result.itemMaxQuant, result.itemImgSrc);
      }
    })
  }

  createItem(itemName, itemMaxQuant, imgSrc){
    this.auth.createItem(this.userId, this.idRoom, itemName, itemMaxQuant, imgSrc).subscribe((data: any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.items = data.itemsList;
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
      }
    })
  }

}
