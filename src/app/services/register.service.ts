import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  url: string = this.loginService.url;

  createUser(user: any) {

    const userData = {
      email: user.email,
      phone: user.phone,
      direction: user.city + ' ' + user.municipality + ' ' + user.street,
      username: user.username,
      password: user.password,
      roles: ["INVITED"]
    }

    console.log('userData ', userData);

    return this.http.post(`${this.url}/createuser`, userData);
  }

  validate(code: any) {

    const codeData = {
      email: code.email,
      code: code.code
    }

    return this.http.post(`${this.url}/email/validate`, codeData);
  }

}
