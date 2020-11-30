import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  userId: number;
  items =[];

  constructor(private auth: AuthService, private snackBar: MatSnackBar) {
    //Get user ID
    this.userId = parseInt(localStorage.getItem('userId'), 10);
   }


  ngOnInit(): void {
    this.auth.getShopList(this.userId).subscribe((data: any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
      }else{
        this.items = data.shopList;
      }
    })
  }

}
