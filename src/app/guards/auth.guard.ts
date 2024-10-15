import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, async } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../auth/authentication.service'; // Asegúrate de importar el servicio

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
     private router: Router,
     private storage: Storage) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isAuthenticated = true;

    if (await this.storage.get('isLoggedIn')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
