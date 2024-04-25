import { Component } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent {

  activeButton = 1;
  products = [
    { id: 1, name: 'Product 1', description: "desc", price: 10 },
    { id: 2, name: 'Product 2', description: "desc", price: 20 },
    { id: 3, name: 'Product 3', description: "desc", price: 30 },
    { id: 4, name: 'Product 4', description: "desc", price: 40 },
    { id: 5, name: 'Product 5', description: "desc", price: 50 },
  ];
  
}
