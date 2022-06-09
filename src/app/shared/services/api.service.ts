import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private setHeader() {
    const headers = new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    return headers;
  }

  public get<T>(url: string, params?: HttpParams) {
    if (!params) {
      params = new HttpParams();
    }

    let options = {
      headers: this.setHeader(),
      params: params,
    };
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, body?: any) {
    let options = {
      headers: this.setHeader(),
    };

    return this.http.post<T>(url, body, options);
  }

  public put<T>(url: string, body?: any) {
    let options = {
      headers: this.setHeader(),
    };

    return this.http.put<T>(url, body, options);
  }
  public delete(url: string) {
    let options = {
      headers: this.setHeader(),
    };

    return this.http.delete(url, options);
  }
}
