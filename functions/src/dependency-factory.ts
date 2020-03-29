import {ProductController} from './products/product.controller';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {ProductRepository} from './products/product.repository';
import {ProductService} from './products/product.service';

export class DependencyFactory {
  getProductController(): ProductController {
    const repo: ProductRepository = new ProductRepositoryFirebase();
    const service: ProductService = new ProductService(repo);
    return new ProductControllerFirebase(service)
  }

}
