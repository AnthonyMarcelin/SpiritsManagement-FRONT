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
    return this.apiService.get<Label[]>('label');
  }
  getLabelById(id: number): Observable<Label> {
    return this.apiService.get<Label>(`label/${id}`);
  }
  createLabel(label: Label): Observable<Label> {
    return this.apiService.post<Label>('label', label);
  }
  updateLabel(id: number, label: Label): Observable<Label> {
    return this.apiService.put<Label>(`label/${id}`, label);
  }
  deleteLabel(id: number): Observable<void> {
    return this.apiService.delete<void>(`label/${id}`);
  }
}
