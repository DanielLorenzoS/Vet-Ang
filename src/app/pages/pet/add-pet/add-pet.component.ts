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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.newPetForm = this.initializeForm();
    this.getClients();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      race: ['', [Validators.required]],
      specie: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.spinner.showLoadingIndicator();
    this.petService.addPet(this.newPetForm.value).subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      Swal.fire({
        icon: 'success',
        text: 'Mascota agregada correctamente',
      });
      this.router.navigate([`/dashboard/client`]);
    }), (error: any) => {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo agregar la mascota',
      });
      console.log(error);
    }
  }

  back() {
    this.router.lastSuccessfulNavigation;
    console.log('Regresando');
  }

  getClients() {
    this.spinner.showLoadingIndicator();
    this.userService.getUserByRole('CLIENT').subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      this.listClients = data;
    });
  }
}
