import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, LoginResponse } from '../models/auth';
import { map, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/apiResponse';
import {env} from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AuthSvc {

  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = env.apiUrl + '/auth';

  login(data: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, data)
      .pipe(
        map(res => res.object),
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('userId', res.userId.toString());
          this.router.navigate(['/tasks']);
        })
      );
  }

  register(data: RegisterRequest) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
