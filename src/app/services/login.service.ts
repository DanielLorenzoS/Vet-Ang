import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  generateToken(user: any) {
    console.log('user ', user);
    return this.http.post(`${this.url}/generate`, user);
  }

  login(token: any) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
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
    return this.http.get(`${this.url}/actual`);
  }
}
