import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Whisky } from '../../models/whisky.interface';

@Injectable({
  providedIn: 'root',
})
export class WhiskyService {
  constructor(private apiService: ApiService) {}

  getAllWhisky(): Observable<Whisky[]> {
    return this.apiService.get<Whisky[]>('whisky');
  }

  getWhiskyById(id: string): Observable<Whisky> {
    return this.apiService.get<Whisky>(`whisky/${id}`);
  }
}
