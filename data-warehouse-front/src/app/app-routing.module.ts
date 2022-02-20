import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginGuardGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { RegionCityComponent } from './region-city/region-city.component';

const routes: Routes = [
  {
    path: 'contacts', component: ContactsComponent, canActivate: [LoginGuardGuard]
  },
  {
    path: 'region', component: RegionCityComponent, canActivate: [LoginGuardGuard],
  },
  {
    path: 'login', component: LoginComponent,
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
