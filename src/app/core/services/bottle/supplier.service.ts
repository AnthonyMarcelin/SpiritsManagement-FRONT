import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

export interface Supplier {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  createSupplier(payload: { name: string }) {
    return this.apiService.post('supplier', payload);
  }

  constructor(private apiService: ApiService) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.apiService.get<Supplier[]>('supplier');
  }

  updateSupplier(id: number, payload: { name: string }) {
    return this.apiService.put(`supplier/${id}`, payload);
  }
}
