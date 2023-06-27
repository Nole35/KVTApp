import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtAuthenticationRequest} from "../model/JwtAuthenticationRequest";
import {catchError, map, Observable, throwError} from "rxjs";
import {JwtUtilsService} from "./jwt-utils.service";
import { JwtHelperService } from '@auth0/angular-jwt';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  private readonly loginPath = "http://localhost:8087/api/users/login";


  // public token: string;
  public token: string = '';
  tokenPayload: any;
  expirationDate: any;


  constructor(private http: HttpClient, private jwtUtilsService: JwtUtilsService, private jwtHelper :JwtHelperService) {}

  login(user:JwtAuthenticationRequest): Observable<boolean> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.loginPath}`, {username: user.username, password: user.password}, { headers }).pipe(map((res: any) => {

      console.log("USERNAME: " + user.username);
      console.log("PASSWORD: " + user.password);

      let token = res && res['accessToken'];
      console.log(token)
      if (token) {
        localStorage.setItem('currentUser', JSON.stringify({
          username: user.username,
          roles: this.jwtUtilsService.getRoles(token),
          token: token
        }));
        return true;
      }
      else {
        return false;
      }
    })).pipe(catchError
    ((error: any) => {
      if (error.status === 400) {
        return throwError(() => 'Ilegal login');
        //return Observable.throw('Ilegal login');
      }
      else {
        return throwError(() => error.json().error || 'Server error');
        //return Observable.throw(error.json().error || 'Server error');
      }
    }));
  }

  getToken(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if (this.getToken() != '') return true;
    else return false;
  }

  getCurrentUser() {
    if (localStorage["currentUser"]) {
      return JSON.parse(localStorage["currentUser"]);
    }
    else {
      return undefined;
    }
  }

  GetTokenDecoded() : any {
    this.token = this.getToken();
    console.log(this.jwtHelper.decodeToken(this.token))
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.token));
    return this.tokenPayload;
  }

}
