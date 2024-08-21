import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { user } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private apiUrl = 'http://localhost:3000';


  http = inject(HttpClient);
  router = inject(Router);
  jwtHelper = inject(JwtHelperService);


  login(data: user): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data); 
  }


  register(data: user) {

    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }





}
