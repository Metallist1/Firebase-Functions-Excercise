
import {Product} from '../entities/product';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ProductService} from './product.service';
import {DeleteProduct, ReadProducts, UpdateExistingProduct, WriteNewProduct} from './product.action';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export class ProductStateModel {
  productas: Product;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    productas: undefined
  }
})
@Injectable()
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  static loggedInUser(state: ProductStateModel) {
    return state.productas;
  }

  @Action(ReadProducts)
  ReadProductsFromBase({getState, setState}: StateContext<ProductStateModel>) {
    return this.productService
      .ReadProductsFromBase().pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            productas: result,
          });
        }));
  }
  @Action(WriteNewProduct)
  WriteProducts({getState, setState}: StateContext<ProductStateModel>) {
    return this.productService.CreateProductInBase()
      .pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          productas: undefined,
        });
      }));
  }

  @Action(UpdateExistingProduct)
  UpdateProducts({getState, setState}: StateContext<ProductStateModel>) {
    return this.productService.UpdateProductInBase()
      .pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          productas: undefined,
        });
      }));
  }

  @Action(DeleteProduct)
  DeleteProduct({getState, setState}: StateContext<ProductStateModel>) {
    return this.productService.DeleteProductInBase()
      .pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          productas: undefined,
        });
      }));
  }
}

