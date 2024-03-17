import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private cookieService: CookieService
  ) { }

  url: string = this.loginService.url;

  getPets() {
    return this.http.get(`${this.url}/pet`);
  }

  getPetsByFilter(params: any) {
    return this.http.get(`${this.url}/pet/filter`, { params });
  }
}
