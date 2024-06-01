import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import User from 'src/app/models/User';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  newclientForm!: FormGroup;
  usernameExists: boolean = false;
  emailExists: boolean = false;
  phoneExists: boolean = false;

  userToCreate!: User;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loadingIndicatorService: SpinnerService
  ) { }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.newclientForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/), Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]], // Corregido
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]], // Corregido
      municipality: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]], // Corregido
      street: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]], // Corregido
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]], // Corregido
    });
  }

  createActualDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  onSubmit(): void {
    if (this.newclientForm.valid) {
      this.loadingIndicatorService.showLoadingIndicator();
      let user: User = {
        email: this.newclientForm.value.email,
        phone: this.newclientForm.value.phone,
        name: this.newclientForm.value.name,
        lastName: this.newclientForm.value.lastname,
        city: this.newclientForm.value.city,
        municipality: this.newclientForm.value.municipality,
        street: this.newclientForm.value.street,
        number: this.newclientForm.value.number,
        password: '',
        enabled: true,
        createdAt: '',
        idRole: 2
      };
      this.userService.createClient(user).subscribe(
        (response: any) => {
          this.loadingIndicatorService.hideLoadingIndicator();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente agregado con éxito',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(['/dashboard/client/' + response['id']]);
        },
        (error: any) => {
          this.loadingIndicatorService.hideLoadingIndicator();
          console.log('error ', error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al agregar al cliente',
            showConfirmButton: false,
            timer: 2000
          });
        });
    }

  }

  goBack() {
    this.router.navigate(['dashboard/clients']);
  }
}

