import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { DxDataGridComponent } from 'devextreme-angular';
import config from 'devextreme/core/config';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';


import { environment } from 'src/environments/environment';
import { Product } from '../new-product/shared/models/product';
import { ApiService } from '../new-product/shared/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export const directions: any = {
  auto: {
    icon: 'rowfield',
    shading: true,
    position: {
      of: '#grid',
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  },
  up: {
    icon: 'rowfield',
    shading: true,
    direction: 'up',
    position: {
      of: '#grid',
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  },
  down: {
    icon: 'rowfield',
    shading: true,
    direction: 'down',
    position: {
      of: '.dx-datagrid-rowsview',
      my: 'right top',
      at: 'right top',
      offset: '-16 16',
    },
  },
};

@Component({
  selector: 'app-new-product-v2',
  templateUrl: './new-product-v2.component.html',
  styleUrls: ['./new-product-v2.component.scss']
})
export class NewProductV2Component implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) grid: DxDataGridComponent;

  productForm: FormGroup;

  products: any;

  directions: any;

  selectedRowIndex = -1;

  isPopupVisible: boolean;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.getProducts().subscribe((res) => {
      this.products = res;

      this.directions = directions;
    });
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      description: [''],
      isActive: ['']
    });
  }

  editRow() {
    this.grid.instance.editRow(this.selectedRowIndex);
    this.grid.instance.deselectAll();
  }

  deleteRow() {
    this.grid.instance.deleteRow(this.selectedRowIndex);
    this.grid.instance.deselectAll();
  }

  addRow() {
    this.togglePopup();
  }

  selectedChanged(e) {
    console.log(e);
    this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
  }

  directionChanged(e) {
    config({
      floatingActionButtonConfig: this.directions[e.selectedItem],
    });

    repaintFloatingActionButton();
  }

  getProducts(): Observable<Product[]> {
    return this.apiService.get<any>(`${environment.baseUrl}/product/find/all`);
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  insertProduct() {
    alert('Save clicado!')
  }
}