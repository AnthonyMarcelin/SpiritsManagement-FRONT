import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Origin {
  id: number;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class OriginService {
  constructor(private http: HttpClient) {}

  getAllOrigins(): Observable<Origin[]> {
    return this.http.get<Origin[]>('/api/origin');
  }
}
