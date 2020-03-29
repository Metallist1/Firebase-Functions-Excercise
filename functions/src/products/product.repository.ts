import { Stock } from "../models/stock";

export interface ProductRepository {

  addProductToStock(productId: string, stock: Stock): Promise<any>;
}
