import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './contacts/sortable.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';
import { NgpImagePickerModule } from 'ngp-image-picker';
import { RegionCityComponent } from './region-city/region-city.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CompaniesComponent } from './companies/companies.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { LowerCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContactsComponent,
    HeaderComponent,
    NgbdSortableHeader,
    PopupComponent,
    RegionCityComponent,
    LoginComponent,
    UsersComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgpImagePickerModule,
    HttpClientModule
  ],
  providers: [HttpErrorHandler, LowerCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
