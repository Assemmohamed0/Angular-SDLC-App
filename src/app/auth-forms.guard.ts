import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentationService } from './services/documentation.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthFormsGuard implements CanActivate {



  constructor(private _DocumentationService:DocumentationService , private router:Router)
  {

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._DocumentationService.phasesVisible == true)
      {
        return true;
      }
      else
      {
        this.router.navigate(['sdlc'])
        return false;
      }
  }
  
}
