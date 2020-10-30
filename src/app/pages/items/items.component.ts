import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  isEdit : boolean;

  @Input() imgLink: string;
  @Input() name: string;
  @Input() quant: number;
  @Input() maxQuant: number;

  


  constructor() { }

  ngOnInit(): void {
    this.isEdit = false;
  }

  onEdit(){
    console.log('Last :'+ this.isEdit);
    this.isEdit = true;
    console.log('New :'+ this.isEdit);
  }
  onValidEdit(){
    this.isEdit = false;
  }

  lowQuant(){
    if(this.quant > 0)
      this.quant -= 1; 
  }

  upQuant(){
    if(this.quant < this.maxQuant)
      this.quant += 1;
  }

}
