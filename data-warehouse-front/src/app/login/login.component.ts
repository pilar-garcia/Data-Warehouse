import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get controls() {
    if( this.form === undefined){
      return null;
    } 
    return this.form.controls; 
  }

  login(): void {
    if(this.controls != null && this.form?.valid){
      this.loginService.login({email: this.controls['username'].value, password: this.controls['password'].value});
      this.controls['username'].setValue('');
      this.controls['password'].setValue('');
      this.router.navigateByUrl('/contacts', { skipLocationChange: true }).then(() => {
        this.router.navigate(['contacts']);
    });
    }
  }

}
