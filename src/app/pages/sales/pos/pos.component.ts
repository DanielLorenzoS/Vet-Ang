import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent {

  activeButton = 1;
  activePaymentButton = 1;
  products = [
    { id: 1, name: 'Product 1', description: "desc", price: 10 },
    { id: 2, name: 'Product 2', description: "desc", price: 20 },
    { id: 3, name: 'Product 3', description: "desc", price: 30 },
    { id: 4, name: 'Product 4', description: "desc", price: 40 },
    { id: 5, name: 'Product 5', description: "desc", price: 50 },
    { id: 6, name: 'Product 6', description: "desc", price: 60 },
    { id: 7, name: 'Product 7', description: "desc", price: 70 },
    { id: 8, name: 'Product 8', description: "desc", price: 80 },
    { id: 9, name: 'Product 9', description: "desc", price: 90 },
    { id: 10, name: 'Product 10', description: "desc", price: 100 },
    { id: 11, name: 'Product 11', description: "desc", price: 110 },
    { id: 12, name: 'Product 12', description: "desc", price: 120 },
    { id: 13, name: 'Product 13', description: "desc", price: 130 },
    { id: 14, name: 'Product 14', description: "desc", price: 140 },
    { id: 15, name: 'Product 15', description: "desc", price: 150 },
    { id: 16, name: 'Product 16', description: "desc", price: 160 },
    { id: 17, name: 'Product 17', description: "desc", price: 170 },
    { id: 18, name: 'Product 18', description: "desc", price: 180 },
    { id: 19, name: 'Product 19', description: "desc", price: 190 },
    { id: 20, name: 'Product 20', description: "desc", price: 200 },
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

  constructor(
    private router: Router
  ) { }

  goToPayment() {
    Swal.fire({
      title: 'Ir al pago',
      text: '¿Seguro que no deseas agregar más productos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ir al pago',
      cancelButtonText: 'No, seguir agregando productos',
      cancelButtonColor: '#dd3333',
      confirmButtonColor: '#05828e'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['dashboard/payments']);
      }
    });
  }
  
}
