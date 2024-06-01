import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import User from 'src/app/models/User';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  editClientForm!: FormGroup;
  usernameExists: boolean = false;
  emailExists: boolean = false;
  phoneExists: boolean = false;
  clientToEdit!: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditClientComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private spinner: SpinnerService
  ) { }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.spinner.showLoadingIndicator();
    this.editClientForm = this.initializeForm();
    this.getClientById();
    this.dialogRef.updateSize('80%', '70%');
  }

  getClientById(): void {
    this.userService.getUserById(this.data.user.id).subscribe(
      (response: any) => {
        this.clientToEdit = response;
        this.editClientForm.patchValue(response);
        this.spinner.hideLoadingIndicator();
      },
      (error: any) => {
        this.spinner.hideLoadingIndicator();
        console.log('error ', error);
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['Cargando...', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      phone: ['Cargando...', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      name: ['Cargando...', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]],
      lastName: ['Cargando...', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]],
      city: ['Cargando...', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]],
      municipality: ['Cargando...', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]],
      street: ['Cargando...', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/)]],
      number: ['Cargando...', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  onSubmit() {
    if (this.editClientForm.valid) {
      this.spinner.showLoadingIndicator();

      this.clientToEdit.name = this.editClientForm.value.name;
      this.clientToEdit.lastName = this.editClientForm.value.lastName;
      this.clientToEdit.email = this.editClientForm.value.email;
      this.clientToEdit.phone = this.editClientForm.value.phone;
      this.clientToEdit.municipality = this.editClientForm.value.municipality;
      this.clientToEdit.city = this.editClientForm.value.city;
      this.clientToEdit.street = this.editClientForm.value.street;
      this.clientToEdit.number = this.editClientForm.value.number;

      this.userService.updateUser(this.clientToEdit).subscribe(
        (res: any) => {
          this.spinner.hideLoadingIndicator();
          Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            showConfirmButton: false,
            timer: 1000
          })
          this.dialogRef.close();
        }
      ), (err: any) => {
        this.spinner.hideLoadingIndicator();
        Swal.fire({
          icon: 'error',
          text: 'No se pudieron guardar los cambios',
        })

      }
    }
  }

}
