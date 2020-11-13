import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {

  public tabSelected:string;

  constructor() { }

  ngOnInit(): void {
  }

  openTab(slectedTab){
    // Initialize Div
    const compteDiv = document.getElementById("compteTab");
    const securiteDiv = document.getElementById("secuTab");
    const familyDiv = document.getElementById("familyTab");
    const paraDiv = document.getElementById("paraTab");

    //compte selected
    if(slectedTab == "compte"){
      compteDiv.className = "btn btn-primary";
      securiteDiv.className = "btn btn-light";
      familyDiv.className = "btn btn-light";
      paraDiv.className = "btn btn-light";

      this.tabSelected = slectedTab;
    }
    //secu selected
    if(slectedTab == "secu"){
      compteDiv.className = "btn btn-light";
      securiteDiv.className = "btn btn-primary";
      familyDiv.className = "btn btn-light";
      paraDiv.className = "btn btn-light";

      this.tabSelected = slectedTab;
    }
    //family selected
    if(slectedTab == "family"){
      compteDiv.className = "btn btn-light";
      securiteDiv.className = "btn btn-light";
      familyDiv.className = "btn btn-primary";
      paraDiv.className = "btn btn-light";

      this.tabSelected = slectedTab;
    }
     //family selected
     if(slectedTab == "para"){
      compteDiv.className = "btn btn-light";
      securiteDiv.className = "btn btn-light";
      familyDiv.className = "btn btn-light";
      paraDiv.className = "btn btn-primary";

      this.tabSelected = slectedTab;
    }
      

    console.log('l\'option est : '+this.tabSelected);
    
  }

}
