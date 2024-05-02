import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Validation from '../../../utils/validations/validation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  
  constructor(private fb:FormBuilder){
    this.registrationForm = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required,Validators.email])],
      mobile: ["", Validators.compose([Validators.required,Validators.minLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      password: ["", Validators.compose([Validators.required,Validators.minLength(6)])],
      re_password: ["", Validators.compose([Validators.required])],
    },{
      validators: [Validation.match('password', 're_password')],
    })
  }

  

  ngOnInit(){

  }
  get fc(){
    return this.registrationForm.controls;
  }

  pwdMatchValidator(frm: any) {
    if(this.registrationForm.controls['password'].value !== this.registrationForm.controls['re_password'].value){
      this.registrationForm.controls['re_password'].setErrors({'mismatch': true});
    }
 }

  onLogin(){
    console.log(this.registrationForm)
  }
}
