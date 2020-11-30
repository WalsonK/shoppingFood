import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  clickEventsubscription:Subscription;

  globalLoading: boolean;

  userId: number;
  items =[];

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private sharedService: SharedService) {
    //Get user ID
    this.userId = parseInt(localStorage.getItem('userId'), 10);

    this.clickEventsubscription = this.sharedService.getReloadEvent().subscribe(()=>{
      this.ngOnInit();
      })
   }


  ngOnInit(): void {
    this.globalLoading = true;
    this.auth.getShopList(this.userId).subscribe((data: any) =>{
      if(data.error) {
        this.snackBar.open(data.message,'',{ duration : 2000, panelClass: 'snackbar-danger'});
        //Temps de chargement 
        setTimeout(() => {
          this.globalLoading = false;
        }, 1000);
      }else{
        this.items = data.shopList;
        //Temps de chargement 
        setTimeout(() => {
          this.globalLoading = false;
        }, 1000);
      }
    })
  }

}
