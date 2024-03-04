import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }


  getBills(params: any) {
    return this.http.get(`${this.url}/bills`, { params });
  }
  
}
