import { Component, OnInit } from '@angular/core';

import notify from 'devextreme/ui/notify';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Change } from '../order/shared/models/change';
import { Product } from './shared/models/product';
import { ApiService } from './shared/services/api.service';
import { ProductService } from './shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [ProductService]
})
export class NewProductComponent implements OnInit {

  products: any;

  changes: Change<Product>[] = [];

  editRowKey?: number = null;

  isLoading = false;

  loadPanelPosition = { of: '#gridContainer' };
  

  constructor(private apiService: ApiService) { }

   ngOnInit(): void {
    this.getProducts().subscribe((res) => {
      this.products = res;
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
    
    if (change.type == 'insert') {
      this.apiService
        .post(`${environment.baseUrl}/product/insert`, change.data)
        .subscribe((res) => {
          this.getProducts().subscribe(
            (res) => {
              this.products = res;
              this.isLoading = false;
              this.showMessageSuccess('Produto cadastrado com sucesso!');
              this.editRowKey = null;
              this.changes = [];
            },
            (error) => {
              this.showMessageError('Ocorreu um erro ao salvar.');
            }
          );
        });
    } else if (change.type == 'update') {
      this.apiService
        .put(
          `${environment.baseUrl}/product/update/${change.key}`,
          change.data
        )
        .subscribe((res) => {
          this.getProducts().subscribe(
            (res) => {
              this.products = res;
              this.isLoading = false;
              this.editRowKey = null;
              this.changes = [];
              this.showMessageSuccess('Produto atualizado com sucesso!');
            },
            (error) => {
              this.showMessageError('Ocorreu um erro ao atualizar.');
            }
          );
        });
    } else if(change.type == "remove"){
      this.apiService
        .delete(
          `${environment.baseUrl}/product/delete/${change.key}`,
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

  getProducts(): Observable<Product[]> {
    return this.apiService.get<any>(`${environment.baseUrl}/product/find/all`);
  }

  showMessageSuccess(msg) {
    notify(
      {
        message: msg,
        width: 200,
        position: {
          at: 'bottom',
          my: 'bottom',
          of: '#container',
        },
      },
      'success',
      2500
    );
  }

  showMessageError(msg) {
    notify(
      {
        message: msg,
        width: 200,
        position: {
          at: 'bottom',
          my: 'bottom',
          of: '#container',
        },
      },
      'error',
      2500
    );
  }
}
