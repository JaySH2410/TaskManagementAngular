import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthSvc } from '../../services/auth-svc';
import { RegisterRequest } from '../../models/auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthSvc, private router: Router) {}

  onRegister() {
  if (this.registerForm.invalid) return;

  const payload: RegisterRequest = {
    userName: this.registerForm.value.userName!,
    password: this.registerForm.value.password!
  };

  this.auth.register(payload).subscribe({
    next: () => {
      alert("Registered successfully! Please login.");
      this.router.navigate(['/login']);
    },
    error: err => console.error(err)
  });
}
toLogin(){
  this.router.navigate(['/login']);
}

}
