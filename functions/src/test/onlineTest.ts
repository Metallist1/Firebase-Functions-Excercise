import 'jest';

import * as admin from 'firebase-admin';
import {addProduct, buyProduct} from '../index';
import {Product} from '../models/product';
import {WrappedFunction} from 'firebase-functions-test/lib/main';
import {Order} from '../models/order';
import {Stock} from '../models/stock';

const testas = require('firebase-functions-test')({
  databaseURL: 'https://function-test-project-7e981.firebaseio.com',
  storageBucket: 'function-test-project-7e981.appspot.com',
  projectId: 'function-test-project-7e981',
}, './service-account.json');

let product: Product = {name:"RandomProduct"};
let stock: Stock = {productID:"RandomProduct",productStockCount:4};
let order: Order = {productBID:"RandomProduct",productBName: "RandomName",productBCount:1};
/// FIRESTORE

describe('addProduct', () => {

  let wrapped: WrappedFunction; //Wrapped Function
  beforeAll(() => {
    //Which function to initially test
    wrapped = testas.wrap(addProduct);

  });

  //Post function clean up in database
  afterAll( () => {
   admin.firestore().doc(`Stock/RandomProduct`).delete().catch(error =>{
     console.log(error);
   });
    admin.firestore().doc(`Orders/RandomOrder`).delete().catch(error =>{
      console.log(error);
    });
    testas.cleanup();
  });

  test('add product to database, create stock with 5', async () => {

    const snap = testas.firestore.makeDocumentSnapshot(product, "products/RandomProduct"); //Create snapshot

    // Execute it
    await wrapped(snap,{
      params: {
        productId: "RandomProduct" //insert into params the id that should be in database
      }
    });

    const afterStock = await admin.firestore().doc(`Stock/RandomProduct`).get(); //Get newly inserted Stock
    expect(afterStock.data()).toStrictEqual({"productID": "RandomProduct", "productStockCount": 5}); //Confirm that an object was created stricly
  });


  test('buy product generates an orderlist with product details inside', async () => {
    wrapped = testas.wrap(buyProduct); //Wrap second test.
    const snap = testas.firestore.makeDocumentSnapshot(order, "Orders/RandomOrder"); //Create snapshot
    // Execute it
    await wrapped(snap,{
      params: {
        orderId: "RandomOrder" //insert into params the id that should be in database
      }
    });
    const after = await admin.firestore().doc(`Orders/RandomOrder`).collection(`Orderlist`).doc(order.productBID).get(); //Get newly inserted Stock
    expect(after.data()).toStrictEqual(order);
  });

  test('buy product decreases stock by 1', async () => { //Test above decreased by 1. Thus this test only compares already decreased value
    const after = await admin.firestore().doc(`Stock/RandomProduct`).get(); //Get newly inserted Stock
    expect(after.data()).toStrictEqual(stock);
  });
});






