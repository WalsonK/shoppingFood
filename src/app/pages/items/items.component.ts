import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() imgLink: string;
  @Input() name: string;
  @Input() quant: number;
  @Input() maxQuant: number;


  constructor() { }

  ngOnInit(): void {
  }

}
