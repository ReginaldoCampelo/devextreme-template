import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CustomStore, { ResolvedData } from 'devextreme/data/custom_store';

import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/shared/services/base.service';
import { Change } from 'src/app/pages/order/shared/models/change';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  productDataSource(): CustomStore {
    return new CustomStore({
      key: 'id',
      load: () => {
        return this.getProducts()
      },
      insert: (values) => {
        return this.insert(values)
      },
      remove: (key) => {
        return this.remove(key)
      },
      update: (key, values) => {
        return this.update(key, values)
      }
    });
  }

  getProducts(): Promise<ResolvedData<any>> {
    return this.http.get(
      `${environment.baseUrl}/product/find/all`, this.SetHeaderJson())
      .toPromise()
      .catch(() => { throw 'Data loading error' });
  }

  async insert(data: any): Promise<any> {
    return await this.http.post<any>(`${environment.baseUrl}/product/insert`, data).toPromise();
  }

  async update(id: any, data: any): Promise<any> {
    return await this.http.put<any>(`${environment.baseUrl}/product/update/${id}`, data).toPromise();
  }

  async remove(id: any): Promise<any> {
    return await this.http.delete<any>(`${environment.baseUrl}/delete/${id}`).toPromise();
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
