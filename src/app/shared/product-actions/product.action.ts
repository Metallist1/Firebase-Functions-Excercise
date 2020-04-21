import {Product} from '../entities/product';

export class ReadProducts {
  static readonly type = 'ReadProducts';
}

export class WriteNewProduct {
  static readonly type = '[Auth] WriteNewProduct';
}

export class UpdateExistingProduct {
  static readonly type = '[Auth] UpdateExistingProduct';
}

export class DeleteProduct {
  static readonly type = '[Auth] DeleteProduct';
}
