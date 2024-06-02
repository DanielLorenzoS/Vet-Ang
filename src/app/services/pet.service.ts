import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import Pet from '../models/Pet';

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

  createPet(pet: Pet) {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    pet.onRegister = `${day}-${month}-${year}`;

    return this.http.post(`${this.url}/pet`, pet);
  }

}
