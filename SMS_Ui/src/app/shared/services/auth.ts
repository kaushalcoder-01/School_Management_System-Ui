import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
    role: string | null = null;
  apiUrl = 'http://localhost:30106'

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/user/login`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
   
  }
  setRole(role: string) {
    this.role = role;
    localStorage.setItem('userRole', role); 
  }

  getRole() {
    return this.role || localStorage.getItem('userRole');
  }
}
