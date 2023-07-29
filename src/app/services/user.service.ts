import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

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

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/`, { headers });
  }

  getUserByUsername(username: string) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/user/${username}`, { headers });
  }

}
