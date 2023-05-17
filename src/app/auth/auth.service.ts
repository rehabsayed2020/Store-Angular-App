import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = environment.apiUrl;
   private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(private _httpClient :HttpClient , private router: Router) {
    // console.log("api" , this.apiUrl)
  }



  signinUser(data:any) {

    return this._httpClient.post(`${this.apiUrl}/auth/login`, data);

  }
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  setisLoggedIn()
  {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn','true')
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
    localStorage.clear();
  }

  isAuthenticated(){
   let token = localStorage.getItem('token');
    if(token)
    {
      console.log('yes token')
      return true;
    }
    else
    {
      console.log('no token')

      return false;
    }

  }
}
