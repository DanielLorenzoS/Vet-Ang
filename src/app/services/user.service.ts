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

  getUserByRole(role: string) {

    return this.http.get(`${this.url}/roles/${role}`, { withCredentials: true });
  }

  getUserByUsername(username: string) {

    return this.http.get(`${this.url}/user/${username}`, { withCredentials: true });
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

    return this.http.post(`${this.url}/createuser`, userData, { withCredentials: true });
  }

  updateUser(userData: any) {

    console.log(userData);

    return this.http.put(`${this.url}/update/user`, userData, { withCredentials: true });
  }

  deleteUser(id: number) {

    return this.http.delete(`${this.url}/deleteuser/${id}`, { withCredentials: true });
  }
}
