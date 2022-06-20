import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentationService } from './services/documentation.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthDetailsGuard implements CanActivate {




  constructor(private _DocumentationService:DocumentationService , private router:Router)
  {

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._DocumentationService.ProjCharterGetter.length>0 || this._DocumentationService.SRSGetter.length>0)
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
