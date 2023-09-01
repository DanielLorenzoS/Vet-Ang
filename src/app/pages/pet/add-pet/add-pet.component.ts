import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

  newPetForm!: FormGroup;
  listClients!: any;
  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1; // Recuerda que los meses son base 0 en JavaScript
  year = this.today.getFullYear();



  date: string = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private spinner: SpinnerService
  ) { }

  keyPress(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.newPetForm = this.initializeForm();
    this.getClients();
  }


  initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      race: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      specie: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.spinner.showLoadingIndicator();
    this.petService.addPet(this.newPetForm.value).subscribe((data: any) => {
      this.spinner.hideLoadingIndicator();
      Swal.fire({
        icon: 'success',
        text: 'Mascota agregada correctamente',
      });
      this.router.navigate([`/dashboard/pet/${data.id}`]);
    }), (error: any) => {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo agregar la mascota',
      });
      console.log(error);
    }
  }

  goBack() {
    this.location.back();
  }

  getClients() {
    this.spinner.showLoadingIndicator();
    this.userService.getUserByRole('CLIENT').subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      this.listClients = data;
    });
  }
}
