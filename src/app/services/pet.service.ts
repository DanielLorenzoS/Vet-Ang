import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

    getPetsByUserId(id: number) {
      return this.http.get(`${this.url}/pets/user/${id}`);
    }
}