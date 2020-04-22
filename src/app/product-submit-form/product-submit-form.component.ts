import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../shared/product-actions/product.state';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../shared/entities/product';
import {WriteNewProduct, UpdateExistingProduct, SetSelectedProduct} from '../shared/product-actions/product.action';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-product-submit-form',
  templateUrl: './product-submit-form.component.html',
  styleUrls: ['./product-submit-form.component.css']
})
export class ProductSubmitFormComponent implements OnInit, OnDestroy  {
  @Select(ProductState.getSelectedProduct) selectedProduct: Observable<Product>;
  productForm: FormGroup;
  editProduct = false;

  private formSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.formSubscription.add(
      this.selectedProduct.subscribe(product => {
        if (product) {
          this.productForm.patchValue({
            uid: product.uid,
            name: product.name
          });
          this.editProduct = true;
        } else {
          this.editProduct = false;
        }
      })
    );
  }

  createForm() {
    this.productForm = this.fb.group({
      uid: [''],
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.editProduct && this.productForm.value.name !== '') {
      this.formSubscription.add(
        this.store.dispatch(new UpdateExistingProduct(this.productForm.value)).subscribe(() => {
          this.clearForm();
        })
      );
    } else if (this.productForm.value.name !== '') {
      this.formSubscription.add(
        this.formSubscription = this.store.dispatch(new WriteNewProduct(this.productForm.value)).subscribe(() => {
          this.clearForm();
        })
      );
    }
  }

  clearForm() {
    this.productForm.reset();
    this.store.dispatch(new SetSelectedProduct(null));
  }

  ngOnDestroy() {
    return this.formSubscription.unsubscribe;
  }
}
