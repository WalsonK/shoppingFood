import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Import font to the library
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFilm, fas } from '@fortawesome/free-solid-svg-icons';

//Import Angular Material
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoomListComponent } from './pages/room-list/room-list.component';

import { PersonServiceService } from './services/person-service.service';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ItemsComponent } from './pages/items/items.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddItemComponent } from './pages/dialog-add-item/dialog-add-item.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoomListComponent,
    RoomsComponent,
    ItemsComponent,
    DialogAddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    PersonServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faFilm);
  }
}
