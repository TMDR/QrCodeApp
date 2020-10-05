import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfessorGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    // this will be passed from the route config
    // on the data property
    const type:string = localStorage.getItem('token');
    if (
      !this.auth.isAuthenticated() || 
      type != "1"
    ) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }
}
