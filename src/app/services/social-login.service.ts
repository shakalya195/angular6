import { Injectable } from '@angular/core';
import { LoginProvider, SocialUser, AuthServiceConfig } from 'angular-6-social-login';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  private static readonly LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';

  private providers: Map<string, LoginProvider>;

  private _user: SocialUser = null;
  private _authState: BehaviorSubject<SocialUser> = new BehaviorSubject(null);

  constructor(
    private config: AuthServiceConfig,
    private http:HttpClient
  ) {
    this.providers = config.providers;
    this.providers.forEach((provider: LoginProvider, key: string) => {
      provider.initialize().then((user: SocialUser) => {
        user.provider = key;
        this._user = user;
        this._authState.next(user);
      }).catch((err) => {
        // this._authState.next(null);
      });
    });
  }
  
  get authState(): Observable<SocialUser> {
    return this._authState.asObservable();
  }

  signIn(providerId: string): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.signIn().then((user: SocialUser) => {
          user.provider = providerId;
          resolve(user);
          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(SocialLoginService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._user && this._user.provider) {
        let providerId = this._user.provider;
        let providerObject = this.providers.get(providerId);
        providerObject.signOut().then(() => {
          this._user = null;
          this._authState.next(null);
          resolve();
        }).catch((err) => {
          this._authState.next(null);
        });
      } else {
        if(!!this._user)
        reject(SocialLoginService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }


}
