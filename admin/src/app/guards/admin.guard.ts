import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _adminservice: AdminService,
    private _router: Router
  ) { }

  canActivate(): any {
    if (!this._adminservice.isAuthenticated(['admin'])) {
      this._router.navigate(['/login'])
      return false;
    } else {
      return true;
    }

  }

}
