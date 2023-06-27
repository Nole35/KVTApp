import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication-service.service";
import {Observable} from "rxjs";

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}
