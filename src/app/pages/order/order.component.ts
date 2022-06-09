import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Change } from './shared/models/change';
import { Order } from './shared/models/order';
import { OrderService } from './shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy {

  ordersSubscription: Subscription;

  orders$: Observable<Order[]>;

  changes: Change<Order>[] = [];

  editRowKey?: number = null;

  isLoading = false;

  loadPanelPosition = { of: '#gridContainer' };

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();

    this.isLoading = true;
    this.ordersSubscription = this.orders$.subscribe(() => {
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

  async processSaving(change: Change<Order>) {
    this.isLoading = true;

    try {
      await this.orderService.saveChange(change);
      this.editRowKey = null;
      this.changes = [];
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
