import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  
  @Input() roomName: string;
  @Input() isModify: boolean;
  @Input() lastModif: string;

  items = [
    {
      imgLink: '../../../assets/img/mouchoirs.png',
      name: 'Mouchoirs',
      quant: 5,
      isEdit: false,
      maxQuant: 20
    },
    {
      imgLink: '../../../assets/img/mouchoirs.png',
      name: 'Mouchoirs 2',
      quant: 5,
      isEdit: false,
      maxQuant: 10
    }
    /*{
      name: 'cuisine',
      lastModif: '05/11/2020 à 9h00',
      isModify: false       mettre a jour les datas envoyé @output event(emit)
    }*/
  ];

  constructor() { }

  ngOnInit(): void {
    
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

}
