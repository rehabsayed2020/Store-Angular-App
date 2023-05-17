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
export class ProductService {

  apiUrl = environment.apiUrl;
  productId!:number
  new_productId!: BehaviorSubject<number>;


  constructor(private _httpClient: HttpClient) {
    this.new_productId = new BehaviorSubject(this.productId);

   }

  getProducts() {
    // const href = 'https://api.github.com/search/issues';

    // const requestUrl = `${this.apiUrl}/products?limit=${limit}&sort=${sort}&order=${order}&page=${
    //   page + 1
    // }`;
    // const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
    //   page + 1
    // }`;
    // const requestUrl = `${href}?limit=${
    //   page + 1
    // }`;

    return this._httpClient.get(`${this.apiUrl}/products`);
  }


  addProduct (data:any) {
    return this._httpClient.post(`${this.apiUrl}/products`, JSON.stringify(data))
}

deleteProduct (id:number) {
  return this._httpClient.delete(`${this.apiUrl}/products/${id}`)
}
// id product
setproductId(id:number)
{
  this.productId = id;
  this.new_productId.next(this.productId);
}

getProductdetails(id:number)
{
  return this._httpClient.get(`${this.apiUrl}/products/${id}`)

}
}
