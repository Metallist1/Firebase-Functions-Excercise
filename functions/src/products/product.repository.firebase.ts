import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import { Stock } from '../models/stock';
import {Product} from '../models/product';


export class ProductRepositoryFirebase implements ProductRepository {
  addProductToStock(productId: string, stock: Stock): Promise<any> {
    //Creates a new Stock object and sets it in the stock document with the product Id
    return admin.firestore().doc(`Stock/${productId}`).set(stock).catch();
  }

  renameProduct(productId: string, beforeP: Product, afterP: Product): Promise<any>  {
    console.log(productId);
    return this.checkStockForRename(productId,beforeP,afterP);
  }

 private checkStockForRename(productId: string, beforeP: Product, afterP: Product) :Promise<any>  {
   return admin.firestore().doc(`Stock/${productId}`).get().then(function(doc) {
      const stock = doc.data() as Stock;
      stock.productID = afterP.name;

      admin.firestore()
       .doc(`Stock/${productId}`)
       .update(stock).catch()
       .catch(error => {
         console.log(error);
       });
   }).catch(error =>{
     console.log(error);
   });
   };

}
