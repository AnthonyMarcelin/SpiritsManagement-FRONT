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
}
