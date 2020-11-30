import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-item',
  templateUrl: './dialog-add-item.component.html',
  styleUrls: ['./dialog-add-item.component.scss']
})
export class DialogAddItemComponent implements OnInit {

  validationStatut = false;
  itemName: string;
  itemType: string = "Mouchoir";
  itemMaxQuant: number = 5;
  itemImgSrc: string;
  item = {};
  

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  validateItem(){
    if(this.itemName.length < 2){
      this.snackBar.open('Le nom est trop court !','',{ duration : 2000, panelClass: 'snackbar-danger'});
    }else{
      this.validationStatut = true;
      if(this.itemType === 'Mouchoir'){
        this.itemImgSrc = '../../../assets/img/mouchoirs.png';
      }else if(this.itemType === 'Papier toilet'){
        this.itemImgSrc = '../../../assets/img/papierToilet.png';
      }
      this.item = {itemName: this.itemName, itemImgSrc: this.itemImgSrc, itemMaxQuant: this.itemMaxQuant};
    }
  }

}
