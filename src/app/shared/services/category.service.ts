import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
// import { FakeApi } from 'src/app/components/products/product-list/product-list.component';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl;
  productId!:number
  // new_productId!: BehaviorSubject<number>;


  constructor(private _httpClient: HttpClient) {
    // this.new_productId = new BehaviorSubject(this.productId);

   }

  getProductsCategory(sort: string, order: SortDirection, page: number , limit:number) {
    // const href = 'https://api.github.com/search/issues';

    const requestUrl = `${this.apiUrl}/products?limit=${limit}&sort=${sort}&order=${order}&page=${
      page + 1
    }`;
    // const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
    //   page + 1
    // }`;
    // const requestUrl = `${href}?limit=${
    //   page + 1
    // }`;

    return this._httpClient.get(requestUrl);
  }

  // get list of categories

  getCategories()
  {
   return this._httpClient.get(`${this.apiUrl}/products/categories`)
  }
  getprodCategories(category:string)
  {
   return this._httpClient.get(`${this.apiUrl}/products/category/${category}`)
  }
}
