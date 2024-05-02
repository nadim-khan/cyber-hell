import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService
  ){
    this.loginForm = this.fb.group({
      password: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ["", Validators.compose([Validators.required,,Validators.email])],
    })
  }

  ngOnInit(){

  }
  get fc(){
    return this.loginForm.controls;
  }

  onLogin(){
    if(this.fc['email'].value==='admin'&&this.fc['password'].value==='1234'){
      this.authService.login(this.fc['email'].value,this.fc['password'].value);
    }
  }
}
