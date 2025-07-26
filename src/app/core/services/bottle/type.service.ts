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
    return this.apiService.get<Type[]>('/types');
  }
  getTypeById(id: number): Observable<Type> {
    return this.apiService.get<Type>(`/type/${id}`);
  }
}
