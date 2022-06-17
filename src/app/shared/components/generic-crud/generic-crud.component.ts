import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/pages/new-product/shared/models/product';
import { ApiService } from 'src/app/pages/new-product/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generic-crud',
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.scss']
})
export class GenericCrudComponent implements OnInit {
  @Input() typeForm: any;
  objectKeys = Object.keys;

  product: Product;
  productForm: FormGroup;


  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      description: ['', [Validators.required]],
      isActive: [true, [Validators.required]]
    })
  }
}
