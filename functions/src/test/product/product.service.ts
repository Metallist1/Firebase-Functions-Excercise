import {ProductRepository} from "../../products/product.repository";
import {ProductService} from '../../products/product.service';
import {IMock, Mock} from "moq.ts";
import {Product} from '../../models/product';
import {Stock} from '../../models/stock';
import {Order} from '../../models/order';

describe('ProductService', () => {
  let productRepository: IMock<ProductRepository>;
  let productService: ProductService;

  let stock: Stock = {productID:"RandomItem",productStockCount:5}
  let product: Product = {name:"RandomItem"};
  let order: Order = {productBID:"N4QCC6aCrCt6ykSXHH5Y",productBName: product.name,productBCount:1};

  beforeEach(() => {
    productRepository = new Mock<ProductRepository>()
      .setup(pr => pr.addProductToStock("RandomItem",stock))
      .returns(new Promise((resolve, reject) => {resolve()}));
    productService = new ProductService(productRepository.object());
  });

  it('Create stock should be named same as product ', async () => {
    const stockas: Stock = productService.createStock(product.name,5);
    expect(stockas.productID).toBe(product.name)
  });

  it('When creating stock. The default stock should be 5', async () => {
    const stockas: Stock = productService.createStock(product.name,5);
    expect(stockas.productStockCount).toBe(5)
  });

//When you buy a Product add it in an Order Collection and count down Stock (you can just fake it by making a new order, with multiple orderliness)
  it('Generate order should generate correct order ', async () => {
    const order1: Order = productService.createOrder(order.productBID,order.productBName,order.productBCount);
    expect(order1.productBID).toBe(order.productBID)
  });
});
