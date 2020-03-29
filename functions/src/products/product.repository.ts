import { Stock } from "../models/stock";
import {Product} from '../models/product';
import {Order} from '../models/order';

export interface ProductRepository {

  addProductToStock(productId: string, stock: Stock): Promise<any>;

  renameProduct(productId: string, beforeP: Product, afterP: Product): Promise<any>;

  buyProduct(orderId: any, order: Order): Promise<any>;
}
