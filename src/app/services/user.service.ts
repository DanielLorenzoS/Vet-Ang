import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* private url: string = environment.url; */
  url = 'http://localhost:8080';
  /* url: string = 'https://spring-vet-production.up.railway.app'; */

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getHeadersViaCookie() {
    const headers = {
      'Authorization': `Bearer ${this.cookieService.get('token')}`
    }
    return headers;
  }

  recoverPassword(email: string) {

    let emailData = {
      username: null,
      email: email
    }

    return this.http.post(`${this.url}/email/recover`, emailData);
  }

  validate(code: any) {

    const codeData = {
      email: code.email,
      code: code.code
    }

    return this.http.post(`${this.url}/email/validate`, codeData);
  }

  changePassword(email: string, password: string) {

    const passwordData = {
      email: email,
      password: password
    }

    console.log(passwordData);

    return this.http.put(`${this.url}/update`, passwordData);
  }

  getAllUsers() {

    return this.http.get(`${this.url}/`, { headers: this.getHeadersViaCookie() });
  }

  getUserByRole(role: string) {

    return this.http.get(`${this.url}/roles/${role}`, { headers: this.getHeadersViaCookie() });
  }

  getUserByUsername(username: string) {

    return this.http.get(`${this.url}/user/username/${username}`, { headers: this.getHeadersViaCookie() });
  }

  getUserByEmail(email: string) {

    return this.http.get(`${this.url}/user/email/${email}`, { headers: this.getHeadersViaCookie() });
  }

  getUserByPhone(phone: string) {

    return this.http.get(`${this.url}/user/phone/${phone}`, { headers: this.getHeadersViaCookie() });
  }

  createClient(user: any) {

    const userData = {
      email: user.email,
      phone: user.phone,
      direction: user.city + ' ' + user.municipality + ' ' + user.street,
      username: user.username,
      password: 'passwordClient',
      roles: ["CLIENT"]
    }

    return this.http.post(`${this.url}/createuser`, userData, { headers: this.getHeadersViaCookie() });
  }

  updateUser(userData: any) {

    return this.http.put(`${this.url}/update/user`, userData, { headers: this.getHeadersViaCookie() });
  }

  deleteUser(id: number) {

    return this.http.delete(`${this.url}/deleteuser/${id}`, { headers: this.getHeadersViaCookie() });
  }
}
