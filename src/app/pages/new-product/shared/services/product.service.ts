import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Change } from 'src/app/pages/order/shared/models/change';
import { Product } from '../models/product';
import applyChanges from 'devextreme/data/apply_changes';

class Response<T> {
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products$ = new BehaviorSubject<Product[]>([]);

  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  updateProducts(change: Change<Product>, data: Product) {
    change.data = data;
    const products = applyChanges(this.products$.getValue(), [change], { keyExpr: 'id' });
    this.products$.next(products);
  }

  getProducts(): Observable<Product[]> {
    this.http.get(`${this.url}/product/find/all`, { headers: new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }) }).toPromise().then((data: Response<Product[]>) => {
      let products = {data: data};

      console.log(products);
      this.products$.next(products.data);
    });

    return this.products$.asObservable();
  }

  async insert(change: Change<Product>): Promise<Product> {
    const httpParams = new HttpParams({ fromObject: { values: JSON.stringify(change.data) } });
    const httpOptions = { body: httpParams, headers: new HttpHeaders({
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
          }) };
    const data = await this.http.post<Product>(`${this.url}/product/insert`, httpParams, httpOptions).toPromise();

    this.updateProducts(change, data);

    return data;
  }

  async update(change: Change<Product>): Promise<Product> {
    const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = { body: httpParams, headers: new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }) };
    const data = await this.http.put<Product>(`${this.url}/product/update`, httpParams, httpOptions).toPromise();

    this.updateProducts(change, data);

    return data;
  }

  async remove(change: Change<Product>): Promise<Product> {
    const httpParams = new HttpParams({ fromObject: { key: change.key } });
    const httpOptions = { body: httpParams, headers: new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }) };
    const data = await this.http.delete<Product>(`${this.url}/delete`, httpOptions).toPromise();

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
