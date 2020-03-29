import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import { Stock } from '../models/stock';


export class ProductRepositoryFirebase implements ProductRepository {
  addProductToStock(productId: string, stock: Stock): Promise<any> {
    //Creates a new Stock object and sets it in the stock document with the product Id
    return admin.firestore().doc(`Stock/${productId}`).set(stock).catch();
  }



}
