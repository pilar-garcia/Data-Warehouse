import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [];

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, private companyService: CompanyService) { 
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
  }

  getCompanies(): void {
    this.companyService.getCompanies().then((value: Observable<Company[]>) =>{
      value.subscribe((companies: Company[]) =>{
          this.companies = companies;
      });
    });
  }

  get controls(){
    return this.form.controls;
  }

  addCompany(): void {
    if(this.form.valid){
      this.companies.push(
        { name: this.controls['name'].value, Country: this.controls['country'].value, address: this.controls['address'].value }
        );
      this.form.reset();
    }
  }

}
