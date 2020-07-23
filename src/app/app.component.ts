import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd,NavigationError,NavigationCancel,Event} from '@angular/router';
import { AuthService } from './services/auth.service';
import { apiUrl } from './common/urls';
import { MessagingService } from './services/messaging.service';
import { SocialLoginService } from './services/social-login.service';
import { TranslateService } from './lang/translate.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  loading:any = false;

  constructor(
    private socialAuthService: SocialLoginService,
    public router: Router,
    private auth:AuthService,
    private messageService:MessagingService,
    public ts:TranslateService,) {
    this.router.events.subscribe(route => {
      window.scrollTo(0, 0);
    })
  }

  @HostListener('window:scroll', ['$event'])
  
  onWindowScroll(event) {
    this.auth.scrollState.next({value:window.pageYOffset});
  }
  
  ngOnInit(){
    if(!!this.auth.getAuthToken()){
      let accessToken = localStorage.getItem('token');
      this.auth.updateToken(accessToken);
    }

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

  }
}
