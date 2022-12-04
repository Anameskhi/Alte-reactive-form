import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {  PasswordValidate } from './validators/password.validate';
import { ValidateUrl } from './validators/url.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  get userNAme() {
    return this.form.get('username');
  }

  get lastName() {
    return this.form.get('lastname');
  }

  get getPassword(){
    return this.form.get('password') ;
  }

  get getConfirmPassword(){
    return this.form.get('confirmPassword') ;
  }

  get email() {
    return this.form.get('userContactInfo.email');
  }

  get phone() {
    return this.form.get('userContactInfo.phone');
  }
  get active() {
    return this.form.get('active');
  }
  get githubUrl(){
    return this.form.get('userContactInfo.githubUrl');
  }

  get experiences() {
    return this.form.get('experience') as FormArray;
  }




  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)
        ]),
    confirmPassword: new FormControl(''),
    active: new FormControl('', Validators.required),

    userContactInfo: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
      ]),
      githubUrl: new FormControl('',ValidateUrl)
    }),

    experience: new FormArray([
      new FormGroup({
        company: new FormControl('', Validators.required),
        years: new FormControl('',[Validators.required,Validators.pattern('((\\+91-?)|0)?[0-9]{4}$')]),
      }),
    ]),
  },{validators: PasswordValidate.passwordMatch});

  addExperience() {
    const experience = this.form.get('experience') as FormArray;
    experience.push(
      new FormGroup({
        company: new FormControl(''),
        years: new FormControl(''),
      })
    );
  }

  submit() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
    this.form.reset()
  }
  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }
  ngOnInit(): void {
    const user = {
      username: "anuka",
      lastname: "meskhi",
      active: true,
      userContactInfo: {
        email: "mesxiana3@gmail.com",
        phone: "571087888"
    },
    experience: [
      {
        company: "unisens",
        years: "2022"
      }
    ]
    
  }
  // user.experience.forEach(()=> this.addExperience())
  this.form.patchValue(user)
}
}
