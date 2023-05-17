import { ProductDetailsComponent } from '../../products/product-details/product-details.component';
import { AddProductComponent } from '../../products/add-product/add-product.component';
import {HttpClient} from '@angular/common/http';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Product} from "../../products/products model";
import { ProductService} from "../../../shared/services/product.service";
import { CategoryService } from 'src/app/shared/services/category.service';
import {MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  public productData: Product[] = [];
  tableData: any =[];
  noProducts: any = 'No product available';
  selected='';
  categoriesList:string[] =[];

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
    }

  ];

  showData= false;
  constructor(private _httpClient: HttpClient, private _CategoryService: CategoryService, private _MatDialog: MatDialog, private router: Router
  ) {
  }

    ngOnInit(): void {
      this.getAllCategory();
    }

  handleFilter(event:any)
  {
    this.isLoadingResults = true
    this._CategoryService.getprodCategories(this.selected).subscribe(data => {
      this.productData = data as Product[];
      this.isLoadingResults = false
      if (this.productData.length > 0) {
        this.tableData = this.productData;
      } else {
        this.noProducts = "No product available!";
        this.tableData = [];

      }
    })
  }






  getAllCategory()
  {
    this._CategoryService.getCategories().subscribe(res=>{
      this.isLoadingResults = false
      this.categoriesList = res as string[];
    } , err=>{})
  }



}

