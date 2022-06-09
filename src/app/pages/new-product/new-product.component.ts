import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Change } from '../order/shared/models/change';
import { Product } from './shared/models/product';
import { ProductService } from './shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [ProductService]
})
export class NewProductComponent implements OnInit, OnDestroy {

  productDataSource: any;

  productsSubscription: Subscription;

  products$: Observable<Product[]>;

  changes: Change<Product>[] = [];

  editRowKey?: number = null;

  isLoading = false;

  loadPanelPosition = { of: '#gridContainer' };

  constructor(private productService: ProductService) {
    
    this.productDataSource = {
      store: {
        type: 'odata',
        url: 'http://localhost:8080/api',
        key: 'id'
      },
      select: [
        'id',
        'description',
        'isActive'
      ]
    }
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();

    this.isLoading = true;
    this.productsSubscription = this.products$.subscribe(() => {
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

  async processSaving(change: Change<Product>) {
    this.isLoading = true;

    try {
      await this.productService.saveChange(change);
      this.editRowKey = null;
      this.changes = [];
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
