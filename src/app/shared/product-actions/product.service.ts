
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth, User} from 'firebase/app';
import {Product} from '../entities/product';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private afa: AngularFireAuth) {}

  ReadProductsFromBase(): Observable<Product> {
    return null; //TODO
  }
  CreateProductInBase(): Observable<Product> {
    return null; //TODO
  }
  UpdateProductInBase(): Observable<Product> {
    return null; //TODO
  }
  DeleteProductInBase(): Observable<Product> {
    return null; //TODO
  }
}
