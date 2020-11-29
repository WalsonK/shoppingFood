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

  @Input() idHouse: number;
  @Input() idRoom: number;
  @Input() roomName: string;
  @Input() isModify: boolean;
  @Input() lastModif: string;

  @Output() roomList = new EventEmitter<Array<any>>();

  items = [
    /*{
      imgLink: '../../../assets/img/mouchoirs.png',
      name: 'Mouchoirs',
      quant: 5,
      isEdit: false,
      maxQuant: 10
    },
    {
      imgLink: '../../../assets/img/papierToilet.png', 
      name: 'Papier Toilette',
      quant: 15,
      isEdit: false,
      maxQuant: 20
    }
    {
      name: 'cuisine',
      lastModif: '05/11/2020 à 9h00',
      isModify: false       mettre a jour les datas envoyé @output event(emit)
    }*/
  ];

  constructor(public dialog : MatDialog, private auth: AuthService, private snackBar: MatSnackBar) {
    //Get user ID
    this.userId = parseInt(localStorage.getItem('userId'), 10);
  }

  ngOnInit(): void {
    
  }

  deleteRoom(){
    this.auth.deleteRoom(this.userId, this.idHouse, this.idRoom).subscribe((data:any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        const snackBarRef = this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
        /*snackBarRef.afterDismissed().subscribe(() => {
          // room list to parent -> room-list component
          document.location.reload(true);
        });*/
        //console.log(data.roomList);
        this.roomList.emit(data.roomList);
      }
    })
  }

  changeRoomName(){
    this.isModify = true;
    
    //items modifing statut
    for(let i = 0;i < this.items.length;i++){
      this.items[i].isEdit = true;
    }
  }
  validateChangeRoomName(){
    this.isModify = false;

    //Change last modif date format (JJ/MM/AAAA à HH/mm)
    var d = new Date();
    this.lastModif = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+' à '+d.getHours() + 'h' + d.getMinutes();

    //items modifing statut
    for(let i = 0;i < this.items.length;i++){
      this.items[i].isEdit = false;
    }
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogAddItemComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: '+result)
    })
  }
}
