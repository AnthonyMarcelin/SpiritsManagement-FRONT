import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rhum } from '../../../models/rhum.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class RhumService {
  constructor(private apiService: ApiService) {}

  getAllRhum(): Observable<Rhum[]> {
    return this.apiService.get<Rhum[]>('rhum', { withCredentials: true });
  }

  getRhumById(id: string): Observable<Rhum> {
    return this.apiService.get<Rhum>(`rhum/${id}`, { withCredentials: true });
  }
}
