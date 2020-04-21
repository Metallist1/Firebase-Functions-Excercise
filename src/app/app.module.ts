import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './main-view/main-view.component';
import {environment} from '../environments/environment';

import { ProductState } from './shared/product-actions/product.state';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent
  ],
  imports: [    NgxsModule.forRoot([ProductState], {
    developmentMode: !environment.production
  }),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
