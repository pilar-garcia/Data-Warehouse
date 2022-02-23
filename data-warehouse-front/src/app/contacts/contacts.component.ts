import { tap } from 'rxjs/operators';

import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import { Observable, of } from 'rxjs';

import {Contact, Channel} from './contact';
import {CountryService} from './contact.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { ImagePickerConf } from 'ngp-image-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from '../region-city/region';
import { RegionsService } from '../region-city/regions.service';
import { Country } from '../region-city/country';
import { City } from '../region-city/city';
import { ContactApiService } from './contact-api.service';
import { CompanyService } from '../companies/company.service';
import { Company } from '../companies/company';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  providers: [CountryService, DecimalPipe],
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  
  countries$: Observable<Contact[]>;
  total$: Observable<number>;
  sortedElement: string;
  sortedDirection: string;
  checkAllContactsModel: boolean;
  displayNewContact = "none";
  displayMoreActions = "none";
  interes: number = 0;
  companies: Company[] = [];

  selectedRegion: Region = {id: 0, name:'', countries: [], opened: false};
  selectedCountry: Country = {id: 0, name:'', cities: [], opened: false};
  
  formContact: FormGroup;
  
  formChannel: FormGroup;
  regions: Region[] =[];
  channels: Channel[] = [];

  imagePickerConf: ImagePickerConf = {
    borderRadius: '50%',
    language: 'en',
    width: '180px',
    height: '180px',
  };

  openModal() {
    this.displayNewContact = "flex";
  }

  onCloseHandled(display: string) {
    if(display === 'newContact'){
      this.displayNewContact = "none";
    }
    if(display === 'moreActions'){
      this.displayMoreActions = "none";
    }
  }

  showMoreActions(){
    this.displayMoreActions = 'flex';
  }


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>|undefined;

  constructor(public service: CountryService, private formBuilder: FormBuilder,
     private regionService: RegionsService, private contactApi: ContactApiService,
     private companyService: CompanyService) {
    this.countries$ = service.countries$;
    console.log(service.countries$);
    this.total$ = service.total$;
    this.sortedElement = '';
    this.sortedDirection = '';
    this.checkAllContactsModel = false;
    this.formContact = this.formBuilder.group({
      inputName: ['', Validators.required],
      inputLastName: ['', Validators.required],
      inputRole: ['', Validators.required],
      inputEmail: ['', Validators.required],
      inputCompany: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.formChannel = this.formBuilder.group({
      channel: ['', Validators.required],
      userAccount: ['', Validators.required],
      preference: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      inputName: ['', Validators.required],
      inputLastName: ['', Validators.required],
      inputRole: ['', Validators.required],
      inputEmail: ['', Validators.required],
      inputCompany: ['', Validators.required],
      region: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.formChannel = this.formBuilder.group({
      channel: ['', Validators.required],
      userAccount: ['', Validators.required],
      preference: ['', Validators.required]
    });
    this.getRegions();
    this.getCompanies();
    this.getContacts();
    this.controls['region'].valueChanges.subscribe(val => {
      this.openRegion(val);
    });
    this.controls['country'].valueChanges.subscribe(val => {
      this.openCountry(val);
    });
  }

  get controls(){
    return this.formContact.controls;
  }

  get channelControls(){
    return this.formChannel.controls;
  }


  getRegions(): void {
    this.regionService.getRegions().then((value: Observable<Region[]>) =>{
      value.subscribe((regions: Region[]) =>{
          this.regions = regions;
      });
    });
  }

  openRegion(i: number){
    this.regionService.getCountriesByRegion(i).then((value: Observable<Country[]>) =>{
      value.subscribe((countries: Country[]) =>{
        this.selectedRegion.countries = countries;
      });
    });
    
  }

  openCountry(i: number){
    this.regionService.getCitiesByCountry(i).then((value: Observable<City[]>) =>{
      value.subscribe((cities: City[]) =>{
        this.selectedCountry.cities = cities;
      });
    });
    
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    if(this.headers){
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
    }
      
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
    this.sortedDirection = direction;
    this.sortedElement = column;
    if(direction == ''){
      this.sortedElement = '';
    }
  }

  checkAllContacts(): void {
    
    this.countries$.pipe(
      tap(countries => {
        countries.forEach(contact => {
            contact.checked = this.checkAllContactsModel;
          });
      })
    ).subscribe();
    
  }

  onImageChange(value: any): void{
    console.log(value);
  }

  addChannel(){
    if(this.channelControls != null && this.formChannel.valid){
        this.channels.push({id: this.channels.length+1, 
          name: this.channelControls['channel'].value,
           value: this.channelControls['userAccount'].value,
            preference: this.channelControls['preference'].value });
            this.formChannel.reset();
    }
  }

  changeInteres(){
    if(this.interes === 100){
      this.interes = 0;
    } else {
      this.interes += 25;
    }
  }

  saveContact(){
    if(this.controls != null && this.formContact.valid){
      let contact = {
        name: this.controls['inputName'].value,
        lastName: this.controls['inputLastName'].value,
        email: this.controls['inputEmail'].value,
        position: this.controls['inputRole'].value,
        address: this.controls['address'].value,
        cityId: this.controls['city'].value,
        companyId: this.controls['inputCompany'].value,
        interes: this.interes+'', 
        channels: this.channels,      
      }
      this.contactApi.postContact(contact).then(value => {
        value.subscribe(contact =>{
          this.formContact.reset();
          this.interes = 0;
          this.channels = [];
          this.getContacts();
        });
      });
    }
  }

  getContacts(){
    this.service.init();
  }

  getCompanies(): void {
    this.companyService.getCompanies().then((value: Observable<Company[]>) =>{
      value.subscribe((companies: Company[]) =>{
          this.companies = companies;
      });
    });
  }

}
