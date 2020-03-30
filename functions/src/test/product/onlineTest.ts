import 'jest';

import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import {addProduct} from '../../index';
import {Product} from '../../models/product';
import {WrappedFunction} from 'firebase-functions-test/lib/main';

// Online Testing
const testEnv = functions({
  projectId: "function-test-project-7e981",
  databaseURL: "https://function-test-project-7e981.firebaseio.com"
}, '././service-account.json');


let product: Product = {name:"RandomItem"};

/// FIRESTORE

describe('addProduct', () => {

  let wrapped: WrappedFunction; //Wrapped Function

  beforeAll(() => {
    //Which function to test
    wrapped = testEnv.wrap(addProduct);
  });

  //Post function clean up in database
  afterAll( () => {
    admin.firestore().doc(`products/RandomProduct`).delete()
    admin.firestore().doc(`Stocks/RandomProduct`).delete()
    testEnv.cleanup();
  });

  test('add product to database, create stock with 5', async () => {
    const path ="products/RandomProduct"; //Path that will be used
    const data =  product ; //Data to be placed

    const snap = testEnv.firestore.makeDocumentSnapshot(data, path); //Create snapshot

    // Execute it
    await wrapped(snap,{
      params: {
        productId: "RandomProduct" //insert into params the id that should be in database
      }
    });

    const after = await admin.firestore().doc(`Stock/RandomProduct`).get(); //Get newly inserted Stock
    expect(after.data()).toStrictEqual({"productID": "RandomItem", "productStockCount": 5} //Confirm that an object was created stricly
    )
  });
});


