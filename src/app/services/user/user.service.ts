import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = AppSettings.APP_URL;

  constructor(private http:HttpClient) { }

  // Add user in cache
  public addUsersToLocalCache(users:User[]):void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Si je vais dans mon cache local, je récupère un item de users sinon je retourne un tableau vide
  public getUsersFromLocalCache():User[] {
    if(localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users')!);
    } else {
      return [];
    }
  }
}
