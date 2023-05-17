


import { Component, OnInit, Input, ViewChild, AfterViewInit, TemplateRef, SimpleChanges, ChangeDetectorRef } from '@angular/core';
// import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ProductService} from "src/app/shared/services/product.service"
import { ToastrService } from 'ngx-toastr';
import { ProductDetailsComponent } from 'src/app/components/products/product-details/product-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, AfterViewInit {

  @Input() tableData: any;
  @Input() columnHeader: any;
  @Input() dialogTemplate: any;
  @Input() source: any;
  @Input() deleteContent: any;
  @Input() filter: any;
  @Input() filterSource: any;

  dataSource: any;
  displayedColumns: string[] = [];

  pageSize = 5;
  pageSizeOptions: number[] = [10, 20, 50, 100, 200];
  resultsLength = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(public translate: TranslateService ,private _MatDialog: MatDialog,private _ProductService:ProductService , private toasts: ToastrService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log('dataSource', this.tableData)
    console.log(this.columnHeader)
    this.columnHeader.map((c: any) => {
      this.displayedColumns.push(c.columnDef);
      console.log('columnDef', c.columnDef)
    }
    );

    console.log('displayedColumns', this.displayedColumns)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.displayedColumns = this.columnHeader.map((c: { columnDef: any; }) => c.columnDef);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(id: any) {
    this._ProductService.deleteProduct(id).subscribe((res) => {
      this.toasts.success('Product delete successfully','success!');

    }, err => {
      this.toasts.error('everything is broken', 'Failed', {
        timeOut: 3000,
      });
     })

  }

  datarow(row:any)
  {
    this._ProductService.setproductId(row.id);
    // this.router.navigateByUrl('/products/details');
    this.onView();


  }
  onView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this._MatDialog.open(ProductDetailsComponent, dialogConfig).afterClosed().subscribe(() => {
      // this.getAllissues();
    })
  }

}
