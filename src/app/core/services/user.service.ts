import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('user');
  }

  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`user/${id}`);
  }
}
