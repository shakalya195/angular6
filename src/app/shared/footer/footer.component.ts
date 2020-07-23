import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'src/app/lang/translate.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  loginData:any={};
  project:any={};
  constructor(
    public ts:TranslateService,
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.auth.loginData$.subscribe(res => {
      if (Object.keys(res).length) {
        this.loginData = res;
      }
      else {
        this.loginData = {};
      }
    });

    this.auth.project$.subscribe(res => {
      if (Object.keys(res).length) {
        this.project = res;
      }
      else {
        this.project = {};
      }
    })
  }

}
