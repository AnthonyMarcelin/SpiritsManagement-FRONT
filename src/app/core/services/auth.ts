import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:3000/api/auth'; // a modif pour backend

  constructor(private http: HttpClient) {
    // Récupère le token du cookie au démarrage
    const cookieToken = AuthService.getTokenFromCookie('accessToken');
    if (cookieToken) {
      this.setToken(cookieToken);
      console.log('[AUTH] Token initialisé depuis le cookie:', cookieToken);
    }
  }

  resendVerification(email: string) {
    return this.http.post(`${this.apiUrl}/resend-verification`, { email });
  }

  static getTokenFromCookie(cookieName: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + cookieName + '=([^;]+)'),
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToken(response.token);
            // Optionnel : localStorage.setItem('accessToken', response.token);
            console.log(
              '[AUTH] Token reçu et stocké après login:',
              response.token,
            );
          }
        }),
      );
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
    const token = this.getToken();
    return this.http.get(`${this.apiUrl}/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}
