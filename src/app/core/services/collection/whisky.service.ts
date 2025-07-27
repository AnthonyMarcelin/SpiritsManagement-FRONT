import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Whisky } from '../../../models/whisky.interface';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root',
})
export class WhiskyService {
  constructor(private apiService: ApiService) {}

  getAllWhisky(): Observable<Whisky[]> {
    return this.apiService.get<Whisky[]>('whisky', { withCredentials: true });
  }

  getWhiskyById(id: string): Observable<Whisky> {
    return this.apiService.get<Whisky>(`whisky/${id}`, {
      withCredentials: true,
    });
  }
  createWhisky(formData: FormData): Observable<Whisky> {
    return this.apiService.post<Whisky>('whisky', formData, {
      withCredentials: true,
    });
  }
  updateWhisky(id: string, formData: FormData): Observable<Whisky> {
    return this.apiService.put<Whisky>(`whisky/${id}`, formData, {
      withCredentials: true,
    });
  }
  deleteWhisky(id: string): Observable<void> {
    return this.apiService.delete<void>(`whisky/${id}`, {
      withCredentials: true,
    });
  }
}
