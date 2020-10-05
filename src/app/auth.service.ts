import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {
    localStorage.setItem('token', '-1');
    
  }
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token == '-1'){
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    return true;
  }
  public loginSuccess(type:Number){
    localStorage.setItem('token', type.toString());
  }
}
