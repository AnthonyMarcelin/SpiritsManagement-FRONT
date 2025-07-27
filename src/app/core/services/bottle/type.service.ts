import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../../../models/type.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private apiService: ApiService) {}

  getAllType(): Observable<Type[]> {
    return this.apiService.get<Type[]>('type');
  }
  getTypesByAlcool(alcool: 'whisky' | 'rhum' | 'beer'): Observable<Type[]> {
    return this.apiService.get<Type[]>(`type?alcohol=${alcool}`);
  }
  getTypeById(id: number): Observable<Type> {
    return this.apiService.get<Type>(`type/${id}`);
  }
  createType(type: Type): Observable<Type> {
    return this.apiService.post<Type>('type', type);
  }
  updateType(id: number, type: Type): Observable<Type> {
    return this.apiService.put<Type>(`type/${id}`, type);
  }
  deleteType(id: number): Observable<void> {
    return this.apiService.delete<void>(`type/${id}`);
  }
}
