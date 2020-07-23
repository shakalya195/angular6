import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate()
  {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
