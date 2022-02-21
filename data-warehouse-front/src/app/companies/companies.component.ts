import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from './company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [
    { name: 'Acamica', address: '123 rio la plata', country: 'Argentina'},
    { name: 'Mercadolibre', address: 'Cr 118 # 32A-3', country: 'Colombia'}
  ];

  form: FormGroup;

  constructor( private formBuilder: FormBuilder) { 
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
  }

  get controls(){
    return this.form.controls;
  }

  addCompany(): void {
    if(this.form.valid){
      this.companies.push(
        { name: this.controls['name'].value, country: this.controls['country'].value, address: this.controls['address'].value }
        );
      this.form.reset();
    }
  }

}
