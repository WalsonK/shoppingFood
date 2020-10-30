import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss','../login/login.component.scss']
})
export class RoomListComponent implements OnInit {

  

  rooms = [
    { //room 1
      name: 'salon',
      lastModif: '28/11/2020 à 22h30',
      isModify: false
    },
    /*{
      name: 'cuisine',
      lastModif: '05/11/2020 à 9h00',
      isModify: false
    }*/
  ];

  constructor() { }

  ngOnInit(): void {
  }

  

}
