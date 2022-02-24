import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  users: User[]= [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', Validators.required],
      checkpassword: ['', Validators.required],
      password: ['', Validators.required]});
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      profile: ['', Validators.required],
      email: ['', Validators.required],
      checkpassword: ['', Validators.required],
      password: ['', Validators.required]});
      this.controls['password'].valueChanges.subscribe(val => {
        this.verifyPass();
      });
      this.controls['checkpassword'].valueChanges.subscribe(val => {
        this.verifyPass();
      });
      this.getUsers();
  }

  get controls(){
    return this.form.controls;
  }

  register(): void {
    if(this.form.valid){
      if(this.controls['password'].value != this.controls['checkpassword'].value){
        this.errorMessage = 'La contraseña debe coincidir';
      } else {
        let user = {name: this.controls['name'].value, email: this.controls['email'].value, lastName: this.controls['lastName'].value, rolId: this.controls['profile'].value, pass: this.controls['password'].value};
        this.userService.postUser(user).then(value => {
          value.subscribe(response =>{
            this.form.reset();
            this.getUsers();
          });
        });
      }
    }
  }

  verifyPass(){
    if(this.controls['password'].value != this.controls['checkpassword'].value){
      this.errorMessage = 'La contraseña debe coincidir';
    } else {
      this.errorMessage = '';
    }
  }

  getUsers(): void {
    this.userService.getUsers().then((value: Observable<User[]>) =>{
      value.subscribe((users: User[]) =>{
          this.users = users;
      });
    });
  }

}
