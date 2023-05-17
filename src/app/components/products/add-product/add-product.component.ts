import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import {CategoryService} from "src/app/shared/services/category.service"

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  value = "";
  matcher = new MyErrorStateMatcher();
  public creatNewProduct!: FormGroup;
  // minDate: Date;
  // maxDate: Date;
  fileToUpload!: File;
  formData = new FormData();
  showLoading = false;
  sucess = false
  categoriesList :string[] = []
  categorySelected=''

  constructor(
    private fg: FormBuilder,
    private _ProductService: ProductService,
    private toasts: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private _CategoryService : CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit() {
    this.formCreatBuilder();
    this.getAllCategory();
  }

  getAllCategory()
  {
    this._CategoryService.getCategories().subscribe(res=>{
      this.categoriesList = res as string[];
    } , err=>{})
  }



  onSubmit() {
    if (this.creatNewProduct.invalid) {
      return;
    }
    let senddata =
    {
      title: this.creatNewProduct.controls["title"].value,
      price: this.creatNewProduct.controls["price"].value,
      description: this.creatNewProduct.controls["description"].value,
      category: this.categorySelected,
      image: 'https://i.pravatar.cc'

    }


    this._ProductService.addProduct(senddata).subscribe(result => {
      this.sucess = true;
      console.log('done')
      this.toasts.success('Product added successfully', 'success!');
      this.onNoClick();
    }, error => {
      this.toasts.error('everything is broken', 'Failed', {
        timeOut: 3000,
      });
    });

  }

  formCreatBuilder() {
    this.creatNewProduct = this.fg.group({
      title: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required],
      image: [""]
    });
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
