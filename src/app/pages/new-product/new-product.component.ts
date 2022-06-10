import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Change } from '../order/shared/models/change';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit, OnDestroy {
  productDataSource: any;

  productsSubscription: Subscription;

  products: any;

  products$ = new Observable<Product[]>();

  changes: Change<Product>[] = [];

  editRowKey?: number = null;

  isLoading = false;

  loadPanelPosition = { of: '#gridContainer' };

  constructor(private apiService: ApiService) {
    this.productDataSource = {
      store: {
        type: 'odata',
        url: 'http://localhost:8080/api',
        key: 'id',
      },
      select: ['id', 'description', 'isActive'],
    };
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProducts().subscribe((res) => {
      this.products = res;
      this.isLoading = false;
    });
  }

  get changesText(): string {
    return JSON.stringify(
      this.changes.map((change) => ({
        type: change.type,
        key: change.type !== 'insert' ? change.key : undefined,
        data: change.data,
      })),
      null,
      ' '
    );
  }

  onSaving(e: any) {
    const change = e.changes[0];

    if (change) {
      e.cancel = true;
      e.promise = this.processSaving(change);
    }
  }

  async processSaving(change: Change<Product>) {
    this.isLoading = true;
    console.log(change)
    if (change.type == 'insert') {
      this.apiService
        .post(`${environment.apiUrl}product/insert`, change.data)
        .subscribe((res) => {
          this.getProducts().subscribe(
            (res) => {
              this.products = res;
              this.isLoading = false;
            },
            (error) => {
              this.showMessageError('Ocorreu um erro ao salvar.');
            }
          );
        });
    } else if (change.type == 'update') {
      this.apiService
        .put(
          `${environment.apiUrl}product/update/${change.key}`,
          change.data
        )
        .subscribe((res) => {
          this.getProducts().subscribe(
            (res) => {
              this.products = res;
              this.isLoading = false;
            },
            (error) => {
              this.showMessageError('Ocorreu um erro ao atualizar.');
            }
          );
        });
    } else if(change.type == "remove"){
      this.apiService
        .delete(
          `${environment.apiUrl}product/delete/${change.key}`,
        )
        .subscribe((res) => {
          this.getProducts().subscribe(
            (res) => {
              this.products = res;
              this.isLoading = false;
              this.showMessageError('Removido com sucesso.');

            },
            (error) => {
              this.showMessageError('Ocorreu um erro ao remover.');
            }
          );
        });
    }
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  getProducts(): Observable<Product[]> {
    return this.apiService.get<any>(`${environment.apiUrl}product/find/all`);
  }

  showMessageError(msg) {
    notify(
      {
        message: msg,
        width: 430,
        position: {
          at: 'bottom',
          my: 'bottom',
          of: '#container',
        },
      },
      'error',
      4500
    );
  }
}
