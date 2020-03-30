import {ProductRepository} from "../../products/product.repository";
import {ProductService} from '../../products/product.service';
import {IMock, Mock} from "moq.ts";
import {Product} from '../../models/product';
import {Stock} from '../../models/stock';

describe('ProductService', () => {
  let productRepository: IMock<ProductRepository>;
  let productService: ProductService;

  let stock: Stock = {productID:"RandomItem",productStockCount:5}
  let product: Product = {name:"RandomItem"};

  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.addProductToStock("RandomItem",stock))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new ProductService(productRepository.object());
  });

  it('Create stock should be named same as product ', async () => {
    const stock1: Stock = productService.createStock(product.name,5);
    expect(stock1.productID).toBe(product.name)
  });

  it('When creating stock. The default stock should be 5', async () => {
    const stock1: Stock = productService.createStock(product.name,5);
    expect(stock1.productStockCount).toBe(5)
  });

});
