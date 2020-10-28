import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss','../login/login.component.scss']
})
export class RoomListComponent implements OnInit {

  roomName = 'Salon';
  isModify = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeRoomName(){
    this.isModify = true;
  }
  validateChangeRoomName(){
    this.isModify = false;
  }

}
