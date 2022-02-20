import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { RegionCityComponent } from './region-city/region-city.component';

const routes: Routes = [
  {
     path: 'contacts', component: ContactsComponent,
 },
 {
  path: 'region', component: RegionCityComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
