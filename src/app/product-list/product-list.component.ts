import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../shared/product-actions/product.state';
import {Observable} from 'rxjs';
import {Product} from '../shared/entities/product';
import {DeleteProduct, ReadProducts, SetSelectedProduct} from '../shared/product-actions/product.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getALLProduct) Products: Observable<Product[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new ReadProducts());
  }

  deleteProduct(uid: string) {
    this.store.dispatch(new DeleteProduct(uid));
  }
  editTodo(payload: Product) {
    this.store.dispatch(new SetSelectedProduct(payload));
  }
}
