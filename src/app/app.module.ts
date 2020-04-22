import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './main-view/main-view.component';
import {environment} from '../environments/environment';

import { ProductState } from './shared/product-actions/product.state';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSubmitFormComponent } from './product-submit-form/product-submit-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ProductListComponent,
    ProductSubmitFormComponent
  ],
  imports: [NgxsModule.forRoot([ProductState], {
    developmentMode: !environment.production
  }),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
