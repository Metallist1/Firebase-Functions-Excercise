import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import { Stock } from '../models/stock';
import {Product} from '../models/product';
import {Order} from '../models/order';


export class ProductRepositoryFirebase implements ProductRepository {
  addProductToStock(productId: string, stock: Stock): Promise<any> {
    return admin.firestore().doc(`Stock/${productId}`).set(stock).catch();
  }

  renameProduct(productId: string, beforeP: Product, afterP: Product): Promise<any>  {
    this.checkStockForRenameInStock(productId,afterP);
    return this.checkStockForRenameInOrders(productId,beforeP,afterP);
  }

 private checkStockForRenameInStock(productId: string, afterP: Product)  {
    admin.firestore().doc(`Stock/${productId}`).get().then(function(doc) {
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


  private checkStockForRenameInOrders(productId: string, beforeP: Product, afterP: Product) :Promise<any>  {
    return admin.firestore().doc(`Orders/${productId}`).get().then(function(doc) {
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

  buyProduct(orderId: any, order: Order): Promise<any> {

    //Buy product
    admin.firestore().doc(`Orders/${orderId}`)
      .collection(`Orderlist`)
      .doc(`${order.productBID}`)
      .set(order)
      .catch();

    //Find in stock and countdown count. Then update stock.
    return admin.firestore().doc(`Stock/${order.productBID}`).get().then(function(doc) {
      const stock = doc.data() as Stock;
      stock.productStockCount = stock.productStockCount - order.productBCount;
      admin.firestore()
        .doc(`Stock/${order.productBID}`)
        .update(stock).catch()
        .catch(error => {
          console.log(error);
        });
    }).catch(error =>{
      console.log(error);
    });
    }
}
