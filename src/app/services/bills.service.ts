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
    return this.http.get(`${this.url}/bill`, { params });
  }

  getBillsByFilter(params: any) {
    return this.http.get(`${this.url}/bill/filter`, { params });
  }

    getBillById(id: string) {
        return this.http.get(`${this.url}/bill/${id}`);
    }

    createBill(data: any) {
        return this.http.post(`${this.url}/bill`, data);
    }

    updateBill(id: string, data: any) {
        return this.http.put(`${this.url}/bill/${id}`, data);
    }

    getBillByUserId(id: string) {
        return this.http.get(`${this.url}/bill/user/${id}`);
    }
}
