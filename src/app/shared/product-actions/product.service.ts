
import { Injectable } from '@angular/core';

import {auth, User} from 'firebase/app';
import {Product} from '../entities/product';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  ReadProductsFromBase() {
    return this.firestore.collection('products').snapshotChanges().pipe(
      map (courses => courses.map(a => {
          // @ts-ignore
        const name = a.payload.doc.data().name;
        const uid = a.payload.doc.id;
        return {uid, name} as Product;
        })
      ));
  }

  CreateProductInBase(data: Product) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('products')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  UpdateProductInBase(data: Product) {
    return this.firestore
      .doc(`products/${data.uid}`)
      .update(data);
  }

  DeleteProductInBase(uid: string) {
    return  data => this.firestore
      .collection('products')
      .doc(uid)
      .delete();
  }
}
