import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ImageKitService {
  constructor(private apiService: ApiService) {}

  getAuthData(): Observable<any> {
    return this.apiService.get('imagekit/auth', { withCredentials: true });
  }
}
