import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* url: string = 'http://localhost:8080'; */
  url: string = 'https://spring-vet-production.up.railway.app';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  generateToken(user: any) {
    console.log(this.url)
    return this.http.post(`${this.url}/auth/login`, user);
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
    this.cookieService.delete('token', '/');
    this.cookieService.set('token', '');
    window.location.reload();
    return true;
  }

  deleteToken() {
    this.cookieService.delete('token');
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

  usernameExists(username: String) {
    return this.http.get(`${this.url}/exists/username/${username}`);
  }

  emailExists(email: String) {
    return this.http.get(`${this.url}/exists/email/${email}`);
  }

  phoneExists(phone: String) {
    return this.http.get(`${this.url}/exists/phone/${phone}`);
  }
}
