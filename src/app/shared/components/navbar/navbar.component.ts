import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from "src/app/auth/auth.service"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  signup!: boolean             // {1}


  constructor(public translate: TranslateService, private _AuthService: AuthService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    // translate.use('ar');
  }

  ngOnInit(): void {
    console.log('login', this._AuthService.isLoggedIn)
    this.isLoggedIn$ = this._AuthService.isLoggedIn; // {2}

    // this.signup = localStorage.getItem('isLoggedIn')


    let isAuth = this._AuthService.isAuthenticated();
    console.log(isAuth)



  }


  change_Translate(langSelect: string) {

    this.translate.use(langSelect);
    localStorage.setItem("language",langSelect);

    langSelect == 'ar' ? document.body.dir = 'rtl' : document.body.dir = 'ltr'


  }

  logout() {
    this._AuthService.logout();

  }




}
