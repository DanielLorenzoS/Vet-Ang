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

  cart = [
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    { id: 3, name: 'Product 3', price: 30, quantity: 1 },
    { id: 4, name: 'Product 4', price: 40, quantity: 1 },
    { id: 5, name: 'Product 5', price: 50, quantity: 1 },
    { id: 6, name: 'Product 6', price: 60, quantity: 1 },
    { id: 7, name: 'Product 7', price: 70, quantity: 1 },
    { id: 8, name: 'Product 8', price: 80, quantity: 1 },
    { id: 9, name: 'Product 9', price: 90, quantity: 1 },
    { id: 10, name: 'Product 10', price: 100, quantity: 1 },
  ];

  total = 100;
  
}
