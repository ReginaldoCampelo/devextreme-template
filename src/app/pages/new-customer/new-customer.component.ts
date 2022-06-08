import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatDate } from 'devextreme/localization';
import { Customer } from './shared/models/customer';

// const URL = 'http://localhost:8080/api';
 const URL = 'http://localhost:3000';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent {

  dataSource: any;

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  constructor(private http: HttpClient) {
    this.refreshMode = 'repaint';
    this.refreshModes = ['full', 'reshape', 'repaint'];

    this.dataSource = new CustomStore({
      key: 'OrderID',
      load: () => this.sendRequest(`${URL}/customer`),
      insert: (values) => this.sendRequest(`${URL}/customer`, 'POST', {
        values: JSON.stringify(values), 
      }),
      update: (key, values) => this.sendRequest(`${URL}/customer`, 'PUT', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.sendRequest(`${URL}/customer`, 'DELETE', {
        key,
      }),
    });
  }

  sendRequest(url: string, method = 'GET', data: any = {}): any {
    this.logRequest(method, url, data);

    const httpParams = new HttpParams({ fromObject: data });
    const httpOptions = { body: httpParams, headers: new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }) };
    let result;

    switch (method) {
      case 'GET':
        result = this.http.get(url, httpOptions);
        break;
      case 'PUT':
        result = this.http.put(url, httpParams, httpOptions);
        break;
      case 'POST':
        result = this.http.post(url, httpParams, httpOptions);
        break;
      case 'DELETE':
        result = this.http.delete(url, httpOptions);
        break;
    }

    return result
      .toPromise()
      .then((data: any) => (method === 'GET' ? data.data : data))
      .catch((e) => {
        throw e && e.error && e.error.Message;
      });
  }

  logRequest(method: string, url: string, data: object): void {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');

    this.requests.unshift([time, method, url.slice(URL.length), args].join(' '));
  }

  clearRequests() {
    this.requests = [];
  }
}
