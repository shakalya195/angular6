import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login';
import { MessagingService } from '../../services/messaging.service';
import { SocialLoginService } from '../../services/social-login.service';
import { Router } from '@angular/router';
import { apiUrl } from '../../common/urls';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from 'src/app/lang/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  constructor(
    private auth: AuthService, 
    public router: Router, 
    private messageService: MessagingService, 
    private socialAuthService: SocialLoginService,
    public ts:TranslateService) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }else {
      return false;
    }
    console.log(socialPlatformProvider);
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      async (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...
        let input = {
          langaugeType: this.ts.lang_code,
          deviceType : 'WEB',
          playerId : this.messageService.playerId,
          id:userData.id,
          email: userData.email,
          name:userData.name,
          image:userData.image,
          provider:userData.provider,
          token:userData.token,
        }
        
        this.auth.postDataApi('user/socialLogin', input).subscribe(async res => {
          console.log('Social Login',res);
          // if (success['success'] == 0) {
          //   let res = await this.messageService.successAlert(this.ts.lang.CompleteYourProfile)
          //   if (res == 'success') {
          //     this.auth.loginData.next(userData);
          //     this.router.navigate(['/signup'])
          //   }
          // }
          this.auth.updateToken(res['data']['accessToken']);
          this.router.navigate(['/internal/dashboard']);
          this.auth.hideModal();
          
        },
          async error => {
            let res = await this.messageService.errorAlert(error.error.msg)
            if (res == 'success') {
              this.auth.loginData.next(userData)
              this.router.navigate(['/signup'])
            }
          })
      }
    );
  }

}
