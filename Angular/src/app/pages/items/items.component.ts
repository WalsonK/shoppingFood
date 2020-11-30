import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  userId: number;

  @Input() itemId: number;
  @Input() imgLink: string;
  @Input() name: string;
  @Input() quant: number;
  @Input() maxQuant: number;
  @Input() isEdit: boolean;

  @Input() roomId: number;

  @Output() itemsList = new EventEmitter<Array<any>>();

  //itemsList a remonter to 

  


  constructor(private auth: AuthService, private snackBar: MatSnackBar, private sharedService: SharedService) { 
    //Get user ID
    this.userId = parseInt(localStorage.getItem('userId'), 10);
  }

  ngOnInit(): void {
    this.isEdit = false;
  }

  onEdit(){
    this.isEdit = true;
  }

  deleteItem(){
    this.isEdit = false;
    this.auth.deleteItem(this.userId, this.itemId, this.roomId).subscribe((data: any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
          // room list to parent -> room-list component
        this.itemsList.emit(data.itemsList);
      }
    });
  }

  lowQuant(){
    if(this.quant > 0)
      this.quant -= 1; 
  }

  upQuant(){
    if(this.quant < this.maxQuant)
      this.quant += 1;
  }

  onValidEdit(){
    this.isEdit = false;
    this.auth.updateItem(this.userId, this.name, this.quant, this.itemId, this.roomId).subscribe((data:any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-success'});
        //Trouver un moyen pour appeler le Oninit de shop-list component
        this.sharedService.sendReloadEvent();
      }
    })
  }

}
