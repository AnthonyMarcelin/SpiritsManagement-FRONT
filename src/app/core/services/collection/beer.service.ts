import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../../../models/beer.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  constructor(private apiService: ApiService) {}

  getAllBeer(): Observable<Beer[]> {
    return this.apiService.get<Beer[]>('beer', { withCredentials: true });
  }

  getBeerById(id: string): Observable<Beer> {
    return this.apiService.get<Beer>(`beer/${id}`, { withCredentials: true });
  }
}
