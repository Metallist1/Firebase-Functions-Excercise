import 'jest';

import * as admin from 'firebase-admin';
import {addProduct, buyProduct, renameProduct} from '../index';
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


describe('index.ts tests', () => {

  let wrapped: WrappedFunction; //Wrapped Function

  //Post test clean up of database.
  afterAll( () => {
    admin.firestore().doc(`Stock/RandomProduct`).delete().catch(error =>{console.log(error);});
    admin.firestore().doc(`/Orders/RandomOrder`).delete().catch(error =>{console.log(error);});
    testas.cleanup();
  });

  test('When adding a product into the database it will create stock document with count of 5', async () => {
    wrapped = testas.wrap(addProduct); //Wrap command that will need to be executed.
    const snap = testas.firestore.makeDocumentSnapshot(product, "products/RandomProduct"); //Create snapshot
    await wrapped(snap,{ params: { productId: "RandomProduct" }}); //Populate params on snapshot and executes it.
    const afterStock = await admin.firestore().doc(`Stock/RandomProduct`).get(); //Get newly inserted Stock
    expect(afterStock.data()).toStrictEqual({"productID": "RandomProduct", "productStockCount": 5}); //Confirm that the object created properly
  });

  test('When buying a product the function will create a sublist called orderlist inside document sublist. This will contain an order', async () => {
    wrapped = testas.wrap(buyProduct);
    const snap = testas.firestore.makeDocumentSnapshot(order, "Orders/RandomOrder");
    await wrapped(snap,{ params: { orderId: "RandomOrder"}});
    const after = await admin.firestore().doc(`Orders/RandomOrder`).collection(`Orderlist`).doc(order.productBID).get();
    expect(after.data()).toStrictEqual(order);
  });

  test('When a product is bought, the stock is decreased by 1', async () => {
    //Test above actually decreases product count by 1 already. This test confirms that it worked.
    const after = await admin.firestore().doc(`Stock/RandomProduct`).get();
    expect(after.data()).toStrictEqual(stock);
  });

  test('When rename product is called. Stock is renamed.', async () => {
    wrapped = testas.wrap(renameProduct);
    const beforeSnap = testas.firestore.makeDocumentSnapshot({name: 'RandomProduct'}, 'products/RandomProduct'); //Create before product
    const afterSnap = testas.firestore.makeDocumentSnapshot({name: 'RandomProductas'}, 'products/RandomProduct'); // Create after product with changed name
    const change = testas.makeChange(beforeSnap, afterSnap); //Specify that there was a change
    await wrapped(change,{params: {productId: "RandomProduct" }});

    let tempStock: Stock = {productID:"RandomProductas",productStockCount:4}; //Generate expected stock

    const afterStock = await admin.firestore().doc(`Stock/RandomProduct`).get();
    expect(afterStock.data()).toStrictEqual(tempStock);
  });

  test('When rename product is called. Orderlist is renamed.', async () => {

    let tempOrder: Order = {productBID:"RandomProduct",productBName: "RandomProductas",productBCount:1}; // Generate expected order

    const after = await admin.firestore().doc(`Orders/RandomOrder`).collection(`Orderlist`).doc(order.productBID).get();
    expect(after.data()).toStrictEqual(tempOrder);
  });
});






