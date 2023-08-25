import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent {
  editPetForm!: FormGroup;
  listClients!: any;
  user!: any;

  constructor(
    public dialogRef: MatDialogRef<EditPetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.editPetForm = this.initializeForm();
    this.getUserByPetId();
    this.getClients();
    this.editPetForm.patchValue({
      name: this.data.pet.name,
      race: this.data.pet.race,
      specie: this.data.pet.specie,
      sex: this.data.pet.sex,
      birthdate: this.data.pet.birthdate.split('-').reverse().join('-'),
      weight: this.data.pet.weight,
      user: this.data.user.id
    });
    console.log(this.data.user);
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
    /* this.petService.addPet(this.editPetForm.value).subscribe((data: any) => {
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
    } */
    console.log(this.editPetForm.value);
    console.log(this.editPetForm.value.birthdate.split('-').reverse().join('-'));
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

  getUserByPetId() {
    this.spinner.showLoadingIndicator();
    this.petService.getOnlyUser(this.data.pet.id).subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(res);
        this.user = res;
        console.log(this.user);
      },
      (err: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    );
  }
}
