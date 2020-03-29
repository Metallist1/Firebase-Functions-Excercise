import { Stock } from "../models/stock";
import {Product} from '../models/product';

export interface ProductRepository {

  addProductToStock(productId: string, stock: Stock): Promise<any>;

  renameProduct(productId: string, beforeP: Product, afterP: Product): any;
}
