import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* private url: string = environment.url; */
  url = 'http://localhost:8080';
  /* url: string = 'https://spring-vet-production.up.railway.app'; */

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

  getUserByRole(role: string) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/roles/${role}`, { headers });
  }

  getUserByUsername(username: string) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/user/${username}`, { headers });
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

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${this.url}/createuser`, userData, { headers });
  }

  updateUser(userData: any) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.put(`${this.url}/update/user`, userData, { headers });
  }

  deleteUser(id: number) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.delete(`${this.url}/deleteuser/${id}`, { headers });
  }
}
