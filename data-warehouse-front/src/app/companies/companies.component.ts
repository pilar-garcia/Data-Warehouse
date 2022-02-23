import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from '../region-city/city';
import { RegionsService } from '../region-city/regions.service';
import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [];
  selectedCountry = '';
  cities: City[] = [];

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, private companyService: CompanyService, private regionService: RegionsService) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.getCompanies();
    this.getCities();
  }

  getCompanies(): void {
    this.companyService.getCompanies().then((value: Observable<Company[]>) =>{
      value.subscribe((companies: Company[]) =>{
          this.companies = companies;
      });
    });
  }

  getCities(): void {
    this.regionService.getCities().then((value: Observable<City[]>) =>{
      value.subscribe((cities: City[]) =>{
          this.cities = cities;
      });
    });
  }

  get controls(){
    return this.form.controls;
  }

  addCompany(): void {
    if(this.form.valid){
      this.companyService.postCompany(  this.controls['name'].value, this.controls['address'].value, this.controls['city'].value ).then((value:Observable<Company>) =>{
        value.subscribe(result =>{
          this.form.reset();
          this.getCompanies();
        });
      })
    }
  }

}
