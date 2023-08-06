import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  /* private url: string = environment.url; */
  url = 'http://localhost:8080';
  /* url: string = 'https://spring-vet-production.up.railway.app'; */


  constructor(
    private http: HttpClient
  ) { }

  getPetsByUserId(id: number) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/pets/user/${id}`, { headers });
  }

  addPet(pet: any) {

    const Pet = {
      name: pet.name,
      sex: pet.sex,
      birthdate: pet.birthdate,
      specie: pet.specie,
      race: pet.race,
      weight: pet.weight,
      user: {
        id: pet.user
      }
    }

    console.log(Pet);

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.post(`${this.url}/pets/`, Pet, { headers });
  }

  deletePet(id: number) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.delete(`${this.url}/pets/${id}`, { headers });
  }

  getPetById(id: number) {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/pets/${id}`, { headers });
  }

  getAllPets() {

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return this.http.get(`${this.url}/pets/`, { headers });
  }
}
