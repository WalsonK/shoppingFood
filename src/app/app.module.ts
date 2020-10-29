import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoomListComponent } from './pages/room-list/room-list.component';

import { PersonServiceService } from './services/person-service.service';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ItemsComponent } from './pages/items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoomListComponent,
    RoomsComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PersonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
