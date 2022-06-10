import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private setHeader() {
    const headers = new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsdWNhcyIsImV4cCI6MTY1NDkwNzAzM30.GvpeIn879gYQZGsJ4iLNdieL9AAiew3q3e5NL5XuZpTa24pRGfsU4DmVG3NuiqQcSR4AJI_uo6KLpA1i7eISUA",
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
