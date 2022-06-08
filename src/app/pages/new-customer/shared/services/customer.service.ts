import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';

const URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  dataSource: any;

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  constructor(private http: HttpClient) {
    this.refreshMode = 'repaint';
    this.refreshModes = ['full', 'reshape', 'repaint'];

    this.dataSource = new CustomStore({
      key: 'id',
      load: () => this.sendRequest(`${URL}/customer/find/all`),
      insert: (values) => this.sendRequest(`${URL}/customer/insert`, 'POST', {
        values: JSON.stringify(values),
      }),
      update: (key, values) => this.sendRequest(`${URL}/customer/update`, 'PUT', {
        key,
        values: JSON.stringify(values),
      }),
      remove: (key) => this.sendRequest(`${URL}/customer/delete`, 'DELETE', {
        key,
      }),
    });
  }

  sendRequest(url: string, method = 'GET', data: any = {}): any {
    this.logRequest(method, url, data);

    const httpParams = new HttpParams({ fromObject: data });
    const httpOptions = { withCredentials: true, body: httpParams };
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
