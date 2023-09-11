import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  url: string = '';

  setUrl(url: string) {
    this.url = url;
    console.log('url assigned', this.url);
  }

  getUrl(): string {
    return this.url;
    console.log('url returned', this.url);
  }

}
