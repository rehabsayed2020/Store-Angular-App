import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input"
import {MatIconModule} from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CdkTableModule } from "@angular/cdk/table";
import { MatToolbarModule } from '@angular/material/toolbar';

// import {
//   MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,  ,
//   MatProgressSpinnerModule} from '@angular/material';
// import {matspinnerm}



const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatOptionModule,
  MatSelectModule,
  CdkTableModule,
  MatToolbarModule


];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
})
export class AngularMaterialModule { }
