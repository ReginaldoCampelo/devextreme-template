import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CustomStore, { ResolvedData } from 'devextreme/data/custom_store';

import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/shared/services/base.service';
import { Change } from 'src/app/pages/order/shared/models/change';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(private apiService: ApiService) {
    super();
  }

  productDataSource(): CustomStore {
    return new CustomStore({
      key: 'id',
      load: () => {
        return this.getProducts();
      },
      insert: (values) => {
        return this.insert(values);
      },
      remove: (key) => {
        return this.remove(key);
      },
      update: (key, values) => {
        return this.update(key, values);
      },
    });
  }

  getProducts(): Promise<ResolvedData<any>> {
    return this.apiService
      .get(`${environment.baseUrl}/product/find/all`)
      .toPromise()
      .catch(() => {
        throw 'Data loading error';
      });
  }

  async insert(data: any): Promise<any> {
    return await this.apiService.post(`${environment.baseUrl}/product/insert`, data);
  }

  async update(id: any, data: any): Promise<any> {
    return await this.apiService.put(`${environment.baseUrl}/product/update/${id}`, data)
  }

  async remove(id: any): Promise<any> {
    return await this.apiService.delete(`${environment.baseUrl}/product/delete/${id}`)
  }

  async saveChange(change: Change<any>): Promise<any> {
    switch (change.type) {
      case 'insert':
        return this.insert(change.data);
      case 'update':
        return this.update(change.key, change.data);
      case 'remove':
        return this.remove(change.key);
    }
  }
}
