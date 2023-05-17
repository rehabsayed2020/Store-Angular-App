import { ProductDetailsComponent } from './../product-details/product-details.component';
import { AddProductComponent } from './../add-product/add-product.component';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { Product } from "../products model";
import { ProductService } from "../../../shared/services/product.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productData: Product[] = [];
  tableData: any;
  noProducts: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  columnHeader = [

    {
      columnDef: "title",
      header: "Title",
      columnHide: false,
      columnSort: false,
      source: "products",
      cell: (element: Product) => `${element.title}`
    },

    {
      columnDef: "description",
      header: "Description",
      columnHide: false,
      columnSort: false,
      source: "products",
      cell: (element: Product) => `${element.description}`
    },

    {
      columnDef: "category",
      header: "Category",
      columnHide: false,
      columnSort: false,
      source: "products",
      cell: (element: Product) => `${element.category}`
    },

    {
      columnDef: "price",
      header: "Price",
      columnHide: false,
      columnSort: false,
      source: "products",
      cell: (element: Product) => `${element.price}`
    },

    {
      columnDef: "image",
      header: "Image",
      columnHide: false,
      columnSort: false,
      source: "products",
      cell: (element: Product) => `${element.image}`
    },

    {
      columnDef: "action",
      header: "Action",
      columnHide: false,
      columnSort: false,
      source: "products",
      cell: (element: Product) => `${element.id}`
    },


  ];

  showData= false;
  constructor(public translate: TranslateService, private _AuthService: AuthService, private _ProductService: ProductService, private _MatDialog: MatDialog, private router: Router
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');

  }


  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this._ProductService.getProducts().subscribe(data => {
      this.isLoadingResults = false;
      this.productData = data as Product[];
      if (this.productData.length > 0) {
        this.tableData = this.productData;
      } else {
        this.noProducts = "No products available!";
        this.tableData = [];

      }
    })




  }



  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this._MatDialog.open(AddProductComponent, dialogConfig).afterClosed().subscribe(() => {
      // this.getAllissues();
    })

  }

  addproduct() {
    this.router.navigateByUrl('/products/add');

  }

  datarow(row: any) {
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







