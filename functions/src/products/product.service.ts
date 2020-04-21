import { ProductRepository } from "./product.repository";
import { Product } from "../models/product";
import { Stock } from "../models/stock";
import {Order} from '../models/order';

export class ProductService {

  constructor(private productRepository: ProductRepository) {
  }

  addProductToStock(productId: string, product: Product): Promise<any> {
    const stock: Stock = this.createStock(product.name,5);
    return this.productRepository.addProductToStock(productId, stock);
  }

  createStock(product: string, inStock:number): Stock {
    const stockDocument: Stock = {
      productID: product,
      productStockCount: inStock
    }
    return stockDocument;
  }

  renameProduct(productId: string, beforeP: Product, afterP: Product) {
    return this.productRepository.renameProduct(productId, beforeP,afterP);
  }


  //Buy orders
  buyProduct(orderId: string, order:Order) : Promise<any>{
   return this.buyProductInDatabase(orderId,order); // Call seperate method for generating order. So methods can be split for TDD.
  }

  //Go to repository and execute buy command
  buyProductInDatabase(orderId: string, order: Order): Promise<any>{
    return this.productRepository.buyProduct(orderId, order);
  }
}
