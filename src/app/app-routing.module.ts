import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoomListComponent } from './pages/room-list/room-list.component';

const routes: Routes = [
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'ma-maison', component: RoomListComponent},
  { path: '',   redirectTo: '/connexion', pathMatch: 'full' } // redirect to `connexion`

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
