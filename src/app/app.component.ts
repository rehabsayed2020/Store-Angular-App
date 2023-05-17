import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'translate';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    // translate.use('en');
    // localStorage.setItem("language","en");
    let lang = localStorage.getItem('language')
    console.log('lang',lang)
    if(lang){
      translate.setDefaultLang(lang);
      translate.use(lang);
    lang =='ar' ? document.body.dir = 'rtl' :""

  }else {
       translate.setDefaultLang('en');
       translate.use('en');
       localStorage.setItem("language","en");
  }

  }
}
