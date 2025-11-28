import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthSvc } from '../../services/auth-svc';
import { LoginRequest } from '../../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthSvc, private router: Router) { }

  onLogin() {
    if (this.loginForm.invalid) return;

    const payload: LoginRequest = {
      userName: this.loginForm.value.userName!,
      password: this.loginForm.value.password!
    };

    this.auth.login(payload).subscribe({
      next: (res: any) => {
        // Save token values
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('userName', res.userName);

        // Navigate
        this.router.navigate(['/tasks']);
      },
      error: err => console.error(err)
    });
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

}
