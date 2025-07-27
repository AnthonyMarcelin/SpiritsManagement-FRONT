// ...existing code...
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RegisterCredentials {
  pseudo: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }
  private apiUrl = 'http://localhost:3000/api/auth'; // a modif pour backend
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true },
    );
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials, {
      withCredentials: true,
    });
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
