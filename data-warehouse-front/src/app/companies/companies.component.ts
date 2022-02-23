import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from '../region-city/country';
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
  countries: Country[] = [];

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, private companyService: CompanyService, private regionService: RegionsService) { 
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.getCompanies();
    this.getCountries();
  }

  getCompanies(): void {
    this.companyService.getCompanies().then((value: Observable<Company[]>) =>{
      value.subscribe((companies: Company[]) =>{
          this.companies = companies;
      });
    });
  }

  getCountries(): void {
    this.regionService.getCountries().then((value: Observable<Country[]>) =>{
      value.subscribe((countries: Country[]) =>{
          this.countries = countries;
      });
    });
  }

  get controls(){
    return this.form.controls;
  }

  addCompany(): void {
    console.log('click');
    if(this.form.valid){
      this.companyService.postCompany(  this.controls['name'].value, this.controls['address'].value, this.controls['country'].value ).then((value:Observable<Company>) =>{
        value.subscribe(result =>{
          this.form.reset();
          this.getCompanies();
        });
      })
    }
  }

}
