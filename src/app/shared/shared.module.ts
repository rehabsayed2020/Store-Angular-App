import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ProductTableComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
    TranslateModule

  ],
  exports: [
    ProductTableComponent,
    NavbarComponent,
  ]
})
export class SharedModule { }
