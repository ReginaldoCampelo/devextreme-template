import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public get<T>(url: string) {
    console.log(this.SetHeaderJson);
    return this.http.get<T>(url, this.SetHeaderJson());
    
  }

  public post<T>(url: string, body?: any) {
    let options = {
      headers: this.SetHeaderJson(),
    };
    console.log(this.SetHeaderJson);
    return this.http.post<T>(url, body, options.headers);
  }

  public put<T>(url: string, body?: any) {
    let options = {
      headers: this.SetHeaderJson(),
    };

    return this.http.put<T>(url, body, options.headers);
  }
  public delete(url: string) {
    let options = {
      headers: this.SetHeaderJson(),
    };

    return this.http.delete(url, options.headers);
  }
}
