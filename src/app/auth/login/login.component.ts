import { AuthGuardService } from './../auth-guard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
// import { NgxSpinnerService } from "ngx-spinner";
// import {AuthService} from "app/shared/auth/auth.service";
import {AuthService} from "../auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('admin', [Validators.required]),
    password: new FormControl('admin', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(    private toasts: ToastrService, private router: Router, private authService: AuthService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let isAuth = this.authService.isAuthenticated();
    console.log(isAuth)
    isAuth ? this.router.navigate(['/products']): null
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }


    let data = {
      "username":"mor_2314",
      "password": "83r5^_"
     }

    this.authService.signinUser(data).subscribe((res :any)  => {
      if(this.loginForm.value.username.includes('admin'))
      {
        this.router.navigate(['/products']);
        localStorage.setItem('role', 'admin');


      }

      else if(this.loginForm.value.username.includes('user'))
      {
        this.router.navigate(['/categories']);
        localStorage.setItem('role', 'user');



      }
      else
      {
        this.router.navigate(['/']);

      }
      this.authService.setisLoggedIn();
      localStorage.setItem('token', res['token']);

        }, error=> {

          this.toasts.error('everything is broken', 'Failed', {
            timeOut: 3000,
          });
            });




  }


}
