import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Change } from 'src/app/pages/order/shared/models/change';
import applyChanges from 'devextreme/data/apply_changes';

class Response<T> {
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users$ = new BehaviorSubject<User[]>([]);

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  updateUsers(change: Change<User>, data: User) {
    change.data = data;
    const users = applyChanges(this.users$.getValue(), [change], { keyExpr: 'id' });
    this.users$.next(users);
  }

  getUsers(): Observable<User[]> {
    this.http.get(`${this.url}/user`).toPromise().then((data: Response<User>) => {
      this.users$.next(data.data);
    });

    return this.users$.asObservable();
  }

  async insert(change: Change<User>): Promise<User> {
    const httpParams = new HttpParams({ fromObject: { values: JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http.post<User>(`${this.url}/user`, httpParams, httpOptions).toPromise();

    this.updateUsers(change, data);

    return data;
  }

  async update(change: Change<User>): Promise<User> {
    const httpParams = new HttpParams({ fromObject: { key: change.key, values: JSON.stringify(change.data) } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http.put<User>(`${this.url}/user`, httpParams, httpOptions).toPromise();

    this.updateUsers(change, data);

    return data;
  }

  async remove(change: Change<User>): Promise<User> {
    const httpParams = new HttpParams({ fromObject: { key: change.key } });
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await this.http.delete<User>(`${this.url}/user`, httpOptions).toPromise();

    this.updateUsers(change, data);

    return data;
  }

  async saveChange(change: Change<User>): Promise<User> {
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
