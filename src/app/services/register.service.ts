import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /* private url: string = environment.url; */
  url = 'http://localhost:8080';
  /* url: string = 'https://spring-vet-production.up.railway.app'; */

  constructor(private http: HttpClient) { }
  
  createUser(user: any) {

    const userData = {
      email: user.email,
      phone: user.phone,
      direction: user.city + ' ' + user.municipality + ' ' + user.street,
      username: user.username,
      password: user.password,
      roles: [ "INVITED" ]
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
