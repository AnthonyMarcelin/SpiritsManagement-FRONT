import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Supplier {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>('/api/supplier');
  }
}
