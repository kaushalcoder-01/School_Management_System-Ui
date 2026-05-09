import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { Auth } from '../shared/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  isPasswordHidden = true;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });
  }

  ngOnInit(): void { }

  togglePasswordVisibility() {

    this.isPasswordHidden =
      !this.isPasswordHidden;
  }

  async onLogin() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return;
    }

    try {

      this.isLoading = true;

      console.log(this.loginForm.value);

      const res: any = await lastValueFrom(

        this.authService.login(
          this.loginForm.value
        )

      );

      console.log('Login Response:', res);

      if (!res) return;

      const role = res.role;
      const token = res.token;

      this.authService.setRole(role);
      this.authService.setToken(token);
      console.log('Role:', role);
      switch (role) {

        case 'ADMIN':
          this.router.navigate(['/admin']);
          break;

        case 'TEACHER':
          this.router.navigate(['/teacher']);
          break;

        case 'STUDENT':
          this.router.navigate(['/student']);
          break;

        case 'PARENT':
          this.router.navigate(['/parent']);
          break;

        default:
          this.router.navigate(['/login']);
          break;
      }

    } catch (error) {

      console.log('Login Error:', error);

    } finally {

      this.isLoading = false;
    }
  }
}