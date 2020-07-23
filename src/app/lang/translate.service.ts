import { Injectable } from '@angular/core';

import { locale as en } from './app.en';
import { locale as nl } from './app.nl';
import { locale as ar } from './app.ar';

@Injectable()
export class TranslateService {

  lang_code:any;
  lang:any={};

  languages:any=[
    {code:'en',name:'English',lang:en},
    {code:'nl',name:'Deutsch',lang:nl},
    // {code:'ar',name:'عربى',lang:ar},

  ];
  
  selectedLanguage:any;

  constructor(

  ) {
    let localLang = localStorage.getItem('lang');
    if(localLang){
      let findLang = this.languages.find(lang=>lang.code == localLang);
      this.lang_code = localLang;
      this.setLanguage(findLang);
    }else{
      this.lang_code = 'en';
      this.setLanguage({code:'en',name:'English',lang:en});
    }

  }

  setLanguage(item){
    this.selectedLanguage = item;
    document.getElementsByTagName('html')[0].setAttribute('lang',item.code);
    this.lang_code = item.code;
    localStorage.setItem('lang',this.lang_code);
    this.languages.forEach(item=>{
      if(item.code == this.lang_code){
        this.lang = item.lang.data.app;
      }
    });
  }


}
