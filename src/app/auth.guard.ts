import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(public router: Router,public apicall:ApiserviceService){}

  canActivate():boolean{
    if(this.loggedIn()){
      return true
    }else{
      this.router.navigate(['/container/login'])
      return false
    }
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  // public logout(){
  //   localStorage.clear()
  //   this.apicall.swalSuccess('Successfully Logout')
  //   this.router.navigate(['/container/login'])
  // }
}
