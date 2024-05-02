import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

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
