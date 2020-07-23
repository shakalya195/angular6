import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Constants } from '../common/constants';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JwtService implements JwtService {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private constants: Constants,
    private authService: AuthService) { }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAuthToken()}`
        }
      });

      return next.handle(request).pipe(
        tap(    
          event => this.handleResponse(request, event),
          error => this.handleError(request, error)
        )
      );

    }
    
    handleResponse(req: HttpRequest<any>, event) {

      if (event instanceof HttpResponse) {
        // console.log('-----Handling Response for----- ', req.url,
      }
    }


    handleError(req: HttpRequest<any>, event) {
      // console.error('-----Handling Error for------ ', req.url,
      // status code 401 means unauthorized
      if (event.status === 401) {
        // logged-in other device
        localStorage.removeItem('accessToken');
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.authService.loginData.next({});
      }
      // this.spinner.hide();
      if (event.error.message && event.error.message !== 'The token you have entered does not match.' &&
      event.error.message !== 'Sorry, your account has been logged in other device! Please login again to continue.') {
        // this.toastrService.error(event.error.message);
      }
    }

}
