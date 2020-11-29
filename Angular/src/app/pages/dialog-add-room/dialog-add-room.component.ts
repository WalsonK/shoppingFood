import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-room',
  templateUrl: './dialog-add-room.component.html',
  styleUrls: ['./dialog-add-room.component.scss']
})
export class DialogAddRoomComponent implements OnInit {

  roomName:string;

  constructor() { }

  ngOnInit(): void {
  }

}
