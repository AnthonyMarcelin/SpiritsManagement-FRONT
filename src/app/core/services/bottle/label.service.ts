import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from '../../../models/label.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private apiService: ApiService) {}

  getAllLabel(): Observable<Label[]> {
    return this.apiService.get<Label[]>('/labels');
  }
  getLabelById(id: number): Observable<Label> {
    return this.apiService.get<Label>(`/label/${id}`);
  }
}
