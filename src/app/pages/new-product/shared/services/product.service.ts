import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import applyChanges from 'devextreme/data/apply_changes';
import CustomStore, { ResolvedData } from 'devextreme/data/custom_store';

import { BaseService } from 'src/app/shared/services/base.service';
import { Change } from 'src/app/pages/order/shared/models/change';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  private products$ = new BehaviorSubject<Product[]>([]);

  private url = 'http://localhost:8080/api';

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
        return this.insertProduct(values)
      },
    //  remove: (key) => {
    //    return this.removeProducts(key)
    //  },
      update: (key, values) => {
        return this.updateProducts(key, values)
      }
    });
  }

  getProducts(): Promise<ResolvedData<any>> {
    return this.http.get(
      `${environment.baseUrl}/product/find/all`, this.SetHeaderJson())
      .toPromise()
      .catch(() => { throw 'Data loading error' });
  }

  insertProduct(values): Promise<ResolvedData<any>> {
    return this.http.post(`${environment.baseUrl}/product/insert`, JSON.stringify(values), this.SetHeaderJson())
      .toPromise()
      .catch(() => { throw 'Insertion failed' });
  }

  updateProducts(key, values): Promise<ResolvedData<any>> {
    return this.http.put(`${environment.baseUrl}/product/update` + encodeURIComponent(key), JSON.stringify(values))
      .toPromise()
      .catch(() => { throw 'Update failed' });
  }

  removeProducts(key): Promise<ResolvedData<any>> {
    return this.http.delete(`${environment.baseUrl}/product/delete` + encodeURIComponent(key))
      .toPromise()
      .catch(() => { throw 'Deletion failed' });
  }

  handleValues(values: string) {
    values.replace("values:", "")

    return values;
  }



  /* deprecated didn't work :(
  getProducts(): Observable<Product[]> {
    this.http.get(`${this.url}/product/find/all`, { headers: new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }) }).toPromise().then((data: Response<Product>) => {
      this.products$.next(data.data);
    });

    return this.products$.asObservable();
  }
  */

  /*
  updateProducts(change: Change<Product>, data: Product) {
    change.data = data;
    const products = applyChanges(this.products$.getValue(), [change], { keyExpr: 'id' });
    this.products$.next(products);
  }
  */

  async insert(change: Change<Product>): Promise<Product> {
    const httpParams = new HttpParams({ fromObject: { values: JSON.stringify(change.data) } });
    const httpOptions = {
      body: httpParams, headers: this.SetHeaderJson()};
    const data = await this.http.post<Product>(`${this.url}/product/insert`, httpParams).toPromise();

    this.updateProducts(change, data);

    return data;
  }

  async update(change: Change<Product>): Promise<Product> {
    const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = {
      body: httpParams, headers: this.SetHeaderJson()};
    const data = await this.http.put<Product>(`${this.url}/product/update`, httpParams).toPromise();

    this.updateProducts(change, data);

    return data;
  }
  

  async remove(change: Change<Product>): Promise<Product> {
    const httpParams = new HttpParams({ fromObject: { key: change.key } });
    const httpOptions = {
      body: httpParams, headers: this.SetHeaderJson()};
    const data = await this.http.delete<Product>(`${this.url}/delete`).toPromise();

    this.updateProducts(change, data);

    return data;
  }

  async saveChange(change: Change<Product>): Promise<Product> {
    switch (change.type) {
      case 'insert':
        return this.insert(change);
      case 'update':
        return this.update(change);
      case 'remove':
        return this.remove(change);
    }
  }
  
}
