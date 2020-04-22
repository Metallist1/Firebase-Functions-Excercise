import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubmitFormComponent } from './product-submit-form.component';

describe('ProductSubmitFormComponent', () => {
  let component: ProductSubmitFormComponent;
  let fixture: ComponentFixture<ProductSubmitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubmitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
