import { Injectable } from '@angular/core';

interface Url {
  url: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  checkUrl(): void {
    if (this.getUrl() != '' || this.getUrl() != undefined) {
      const name = localStorage.getItem('veterinary');
      this.setUrl(this.veterinaries.find(veterinary => veterinary.name === name));
    }
  }

  veterinaries: any[] = [
    { url: 'https://spring-vet-production.up.railway.app', name: 'Veterinaria 1' },
    { url: 'https://spring-vet-production-f8a0.up.railway.app', name: 'Veterinaria 2' },
    { url: 'http://localhost:8080', name: 'Veterinaria 3' }
  ];

  url: Url = {} as Url;

  setUrl(url: any) {
    this.url = url;
  }

  getUrl(): string {
    return this.url.url;
  }

}
