import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {SharedModule} from "src/app/shared/shared.module"
@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
