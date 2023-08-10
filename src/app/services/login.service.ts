import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* private url: string = environment.url; */
  url: string = 'http://localhost:8080';
  /* url: string = 'https://spring-vet-production.up.railway.app'; */


  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  generateToken(user: any) {
    console.log('user ', user);
    return this.http.post(`${this.url}/login`, user);
  }

  login(token: any) {
    this.cookieService.set('token', token);
  }

  isLoggedIn() {
    let token = this.cookieService.get('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.cookieService.deleteAll();
    window.location.reload();
    return true;
  }

  getToken() {
    return this.cookieService.get('token');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  getCurrentUser() {

    const headers = {
      'Authorization': `Bearer ${this.cookieService.get('token')}`
    }

    return this.http.get(`${this.url}/actual`, { headers });
  }

  getEmailUser(username: String) {
    return this.http.get(`${this.url}/actualuser/${username}`);
  }

}
