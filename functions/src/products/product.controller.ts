import {Change, EventContext} from 'firebase-functions';
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

export interface ProductController {

  addProductToStock(snap: DocumentSnapshot, context: EventContext): Promise<void>;

  renameProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

  buyProduct(snap: DocumentSnapshot, context: EventContext): Promise<void>;
}
