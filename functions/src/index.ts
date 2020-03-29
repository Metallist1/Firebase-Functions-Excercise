import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './dependency-factory';

const dependencyFactory = new DependencyFactory();

admin.initializeApp({
  projectId: "function-test-project-7e981",
  databaseURL: "https://function-test-project-7e981.firebaseio.com"
});

exports.addProduct = functions.firestore
  .document('products/{productId}')
  .onCreate((snap, context) => {
    return dependencyFactory.getProductController().addProductToStock(snap, context);
  });

