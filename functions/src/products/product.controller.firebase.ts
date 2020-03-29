import { EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Product } from "../models/product";

export class ProductControllerFirebase implements ProductController {
  constructor(private productService: ProductService) {}

  addProductToStock(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    const product = snap.data() as Product;
    return this.productService.addProductToStock(context.params.productId, product);
  }

}
