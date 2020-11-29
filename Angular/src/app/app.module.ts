import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import font to the library
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFilm, fas } from '@fortawesome/free-solid-svg-icons';

//Import Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopListComponent } from './pages/shop-list/shop-list.component';


import { AuthService } from './services/auth.service';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ItemsComponent } from './pages/items/items.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddItemComponent } from './pages/dialog-add-item/dialog-add-item.component';
import { DialogSettingsComponent } from './pages/dialog-settings/dialog-settings.component';
import { LoadingcardComponent } from './pages/loadingcard/loadingcard.component';
import { DialogAddRoomComponent } from './pages/dialog-add-room/dialog-add-room.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoomListComponent,
    RoomsComponent,
    ItemsComponent,
    DialogAddItemComponent,
    HomeComponent,
    ShopListComponent,
    DialogSettingsComponent,
    LoadingcardComponent,
    DialogAddRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faFilm);
  }
}
