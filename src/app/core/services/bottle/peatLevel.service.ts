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
    return this.apiService.get<PeatLevel[]>('peat');
  }

  getPeatLevelById(id: number): Observable<PeatLevel> {
    return this.apiService.get<PeatLevel>(`peat/${id}`);
  }

  createPeatLevel(peatLevel: PeatLevel): Observable<PeatLevel> {
    return this.apiService.post<PeatLevel>('peat', peatLevel);
  }

  updatePeatLevel(id: number, peatLevel: PeatLevel): Observable<PeatLevel> {
    return this.apiService.put<PeatLevel>(`peat/${id}`, peatLevel);
  }

  deletePeatLevel(id: number): Observable<void> {
    return this.apiService.delete<void>(`peat/${id}`);
  }
}
