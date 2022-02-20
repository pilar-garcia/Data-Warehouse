import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', Validators.required],
      checkpassword: ['', Validators.required],
      password: ['', Validators.required]});
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', Validators.required],
      checkpassword: ['', Validators.required],
      password: ['', Validators.required]});
  }

  register(): void {
    
  }

}
