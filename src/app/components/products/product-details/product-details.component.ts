import { Product } from './../products model';
import { Component, OnInit } from '@angular/core';
import { ProductService} from "../../../shared/services/product.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!:number
  showdialog:boolean = false;
  productdetails: Product = new Product()
  constructor(private _ProductService : ProductService) { }

  ngOnInit(): void {
    this.getstoredetails()
  }

  getstoredetails()
  {
    this._ProductService.new_productId.subscribe(value => {

    })
    this._ProductService.new_productId.subscribe(value =>{
     this.productId = value
     this._ProductService.getProductdetails(this.productId).subscribe(
       res=>{
         this.productdetails = res;
         console.log(this.productdetails)
         this.showdialog= true;
         //this._StoresService.new_storeId.next(null)
       },
       err=>
       {
          console.log('error')
       }
       )
    })

  }

}
