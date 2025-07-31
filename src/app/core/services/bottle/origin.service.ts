import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

export interface Origin {
  id: number;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class OriginService {
  createOrigin(payload: { country: string }) {
    return this.apiService.post('origin', payload);
  }

  constructor(private apiService: ApiService) {}

  getAllOrigins(): Observable<Origin[]> {
    return this.apiService.get<Origin[]>('origin');
  }

  updateOrigin(id: number, payload: { country: string }) {
    return this.apiService.put(`origin/${id}`, payload);
  }
}
