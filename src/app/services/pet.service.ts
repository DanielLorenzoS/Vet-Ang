import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

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

  getPetsByUserId(id: number) {

    return this.http.get(`${this.url}/pets/user/${id}`, { headers: this.getHeadersViaCookie() });
  }

  addPet(pet: any) {

    const Pet = {
      name: pet.name,
      sex: pet.sex,
      birthdate: pet.birthdate,
      specie: pet.specie,
      race: pet.race,
      weight: pet.weight,
      userId: pet.user
    }

    return this.http.post(`${this.url}/pets/`, Pet, { headers: this.getHeadersViaCookie() });
  }

  deletePet(id: number) {

    return this.http.delete(`${this.url}/pets/${id}`, { headers: this.getHeadersViaCookie() });
  }

  getPetById(id: number) {

    return this.http.get(`${this.url}/pets/${id}`, { headers: this.getHeadersViaCookie() });
  }

  getAllPets() {

    return this.http.get(`${this.url}/pets/`, { headers: this.getHeadersViaCookie() });
  }

  getPetsWithUser() {

    return this.http.get(`${this.url}/pets/users`, { headers: this.getHeadersViaCookie() });
  }

  getOnlyUser(id: number) {

    return this.http.get(`${this.url}/user/pet/${id}`, { headers: this.getHeadersViaCookie() });
  }

  updatePet(pet: any) {

    return this.http.put(`${this.url}/pets/`, pet, { headers: this.getHeadersViaCookie() });
  }

  createMedicalHistory(medicalHistory: any) {

    return this.http.post(`${this.url}/medical/`, medicalHistory, { headers: this.getHeadersViaCookie() });
  }

  getMedicalHistoriesById(id: string) {

    return this.http.get(`${this.url}/medical/${id}`, { headers: this.getHeadersViaCookie() });
  }

  deleteMedicalHistory(id: number) {

    return this.http.delete(`${this.url}/medical/${id}`, { headers: this.getHeadersViaCookie() });
  }
}
