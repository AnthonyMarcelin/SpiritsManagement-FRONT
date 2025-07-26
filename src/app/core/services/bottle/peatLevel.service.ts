import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeatLevel } from '../../../models/peatLevel.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class PeatLevelService {
  constructor(private apiService: ApiService) {}

  getAllPeatLevel(): Observable<PeatLevel[]> {
    return this.apiService.get<PeatLevel[]>('/peat-levels');
  }

  getPeatLevelById(id: number): Observable<PeatLevel> {
    return this.apiService.get<PeatLevel>(`/peat-level/${id}`);
  }
}
