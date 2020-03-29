import { ProductRepository } from "./product.repository";
import { Product } from "../models/product";
import { Stock } from "../models/stock";

export class ProductService {

  constructor(private productRepository: ProductRepository) {
  }

  addProductToStock(productId: string, product: Product): Promise<any> {
    const stock: Stock = this.createStock(product);
    return this.productRepository.addProductToStock(productId, stock);
  }

  createStock(product: Product): Stock {
    const stockDocument: Stock = {
      productID: product.name,
      productStockCount: 5
    }
    return stockDocument;
  }

  renameProduct(productId: string, beforeP: Product, afterP: Product) {
    return this.productRepository.renameProduct(productId, beforeP,afterP);
  }
}
