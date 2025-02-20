import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = AppSettings.APP_URL;
  declare private token:string;
  declare private loggedInUsername:string;
  private jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  public login(user:User):Observable<HttpResponse<User>> {
    //return this.http.post<User>(`${this.host}api/auth/login`, user, {observe:'response'});
    return this.http.post<User>(AppSettings.APP_URL+"api/auth/login", user, {observe:'response'});
  }

  public register(user:User):Observable<User> {
    //return this.http.post<User>(`${this.host}api/auth/register`, user);
    return this.http.post<User>(AppSettings.APP_URL+"api/auth/register", user);
  }

  public logout():void {
    this.token='';
    this.loggedInUsername='';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token:string):void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user:User):void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache():User {
    return JSON.parse(localStorage.getItem('user')!);  // ! = peut être null
  }

  public loadToken():void {
    this.token = localStorage.getItem('token') || '{}'; // peut être null
  }

  public getToken():string {
    return this.token;
  }

  public isUserLoggedIn():boolean {
    this.loadToken();  // Je charge le token

    if(this.token != null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') { // Vérifie que la sous-chaîne du token n'est pas null
        if(!this.jwtHelper.isTokenExpired(this.token)) { // Vérifie que le token est toujours valide
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        } 
      } else {
        this.logout();
        return false;
      }
    }
    return false;
  }
}
