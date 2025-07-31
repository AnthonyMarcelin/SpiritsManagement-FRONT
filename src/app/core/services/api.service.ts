import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  get<T>(
    endpoint: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      withCredentials?: boolean;
    },
  ): Observable<T> {
    const token = this.authService.getToken();

    let headers = options && options.headers ? options.headers : {};

    if (token) {
      if (headers instanceof HttpHeaders) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = { ...headers, Authorization: `Bearer ${token}` };
      }
    }

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      headers,
      withCredentials: true,
    });
  }

  post<T>(
    endpoint: string,
    data: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      withCredentials?: boolean;
    },
  ): Observable<T> {
    const token = this.authService.getToken();

    let headers = options && options.headers ? options.headers : {};

    if (token) {
      if (headers instanceof HttpHeaders) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = { ...headers, Authorization: `Bearer ${token}` };
      }
    }

    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      ...options,
      headers,
      withCredentials: true,
    });
  }

  put<T>(
    endpoint: string,
    data: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      withCredentials?: boolean;
    },
  ): Observable<T> {
    const token = this.authService.getToken();

    let headers = options && options.headers ? options.headers : {};

    if (token) {
      if (headers instanceof HttpHeaders) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = { ...headers, Authorization: `Bearer ${token}` };
      }
    }

    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, {
      ...options,
      headers,
      withCredentials: true,
    });
  }

  delete<T>(
    endpoint: string,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      withCredentials?: boolean;
    },
  ): Observable<T> {
    const token = this.authService.getToken();

    let headers = options && options.headers ? options.headers : {};

    if (token) {
      if (headers instanceof HttpHeaders) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers = { ...headers, Authorization: `Bearer ${token}` };
      }
    }

    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      headers,
      withCredentials: true,
    });
  }
}
