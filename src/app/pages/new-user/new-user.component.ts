import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { User } from './shared/models/user';
import { Observable, Subscription } from 'rxjs';
import { Change } from '../order/shared/models/change';
import { UserService } from './shared/services/user.service';

const URL = 'http://localhost:8080/api';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;

  users$: Observable<User[]>;

  changes: Change<User>[] = [];

  editRowKey?: number = null;

  isLoading = false;

  loadPanelPosition = { of: '#gridContainer' };

  refreshModes: string[];

  refreshMode: string;

  requests: string[] = [];

  constructor(private userService: UserService) {
    this.refreshMode = 'repaint';
    this.refreshModes = ['full', 'reshape', 'repaint'];


  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();

    this.isLoading = true;
    this.userSubscription = this.users$.subscribe(() => {
      this.isLoading = false;
    });
  }

  get changesText(): string {
    return JSON.stringify(this.changes.map((change) => ({
      type: change.type,
      key: change.type !== 'insert' ? change.key : undefined,
      data: change.data,
    })), null, ' ');
  }

  onSaving(e: any) {
    const change = e.changes[0];

    if (change) {
      e.cancel = true;
      e.promise = this.processSaving(change);
    }
  }

  async processSaving(change: Change<User>) {
    this.isLoading = true;

    try {
      await this.userService.saveChange(change);
      this.editRowKey = null;
      this.changes = [];
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

//   sendRequest(url: string, method = 'GET', data: any = {}): any {
//    this.logRequest(method, url, data);
//
//    const httpParams = new HttpParams({ fromObject: data });
//    const httpOptions = { body: httpParams, headers: new HttpHeaders({
//      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZTM2OSIsImV4cCI6MTY1NDY4NjA3M30.1FigfUh595XoTg94t2XLFLejV6Lpg-x4mm5HbLyX_MWMhGQpBCXIxLUjsAQLRB8Lq0VMj23j940M11eiIpR6cQ",
//      "Content-Type": "application/json",
//      "Accept": "application/json",
//      "Access-Control-Allow-Origin": "*"
//    }) };
//    let result;
//
//   switch (method) {
//     case 'GET':
//       result = this.http.get(url, httpOptions);
//       break;
//     case 'PUT':
//       result = this.http.put(url, httpParams, httpOptions);
//       break;
//     case 'POST':
//       result = this.http.post(url, httpParams, httpOptions);
//       break;
//     case 'DELETE':
//       result = this.http.delete(url, httpOptions);
//       break;
//   }
//
//   return result
//     .toPromise()
//     .then((data: any) => (method === 'GET' ? data.data : data))
//     .catch((e) => {
//       throw e && e.error && e.error.Message;
//     });
// }

  logRequest(method: string, url: string, data: object): void {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');

    this.requests.unshift([time, method, url.slice(URL.length), args].join(' '));
  }

  clearRequests() {
    this.requests = [];
  }
}
