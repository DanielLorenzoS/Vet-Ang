import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

const Pet = {
  id: '',
  name: '',
  sex: '',
  birthdate: '',
  specie: '',
  race: '',
  weight: '',
  user: {
    id: ''
  }
}

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent {

  pet: any = {};
  user: any = {};
  medicalHistories: any = {};
  showInfo: boolean = true;
  petForm!: FormGroup;
  id: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(
    private petService: PetService,
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.getPets();
    this.petForm = this.formBuilder.group({
      name: [this.pet.name], // Valor inicial para el nombre
      sex: [this.pet.sex], // Valor inicial para el sexo
      birthdate: [this.pet.birthdate], // Valor inicial para la fecha de nacimiento
      specie: [this.pet.specie], // Valor inicial para la especie
      race: [this.pet.race], // Valor inicial para la raza
      weight: [this.pet.weight], // Valor inicial para el peso
    });
  }

  invertDateFormat(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts[0].length === 4)
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    return dateStr;
  }


  getPets() {
    this.spinner.showLoadingIndicator();
    this.petService.getPetById(this.id).subscribe(
      (res: any) => {
        console.log(res);
        if (res === null) {
          Swal.fire({
            icon: 'error',
            text: 'No se pudo obtener la mascota',
          });
          this.router.navigate(['/dashboard/pets']);
        } else {
          this.spinner.hideLoadingIndicator();
          this.pet = res;
          this.medicalHistories = res.medicalHistories;
        }
      },
      (err: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    );
  }

  editMedicalHistory(history: any) {
    this.router.navigate(['/pet/edit-medical-history', history.id]);
  }

  deleteMedicalHistory(history: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.spinner.showLoadingIndicator();
      this.petService.deleteMedicalHistory(history.id).subscribe(
        (res: any) => {
          this.spinner.hideLoadingIndicator();
          console.log(res);
          this.getPets();
        },
        (err: any) => {
          this.spinner.hideLoadingIndicator();
          console.log(err);
        }
      );
    });
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  addMedicalHistory() {
    this.router.navigate(['/dashboard/addMedical'], { queryParams: { id: this.pet.id } });
  }

  getUserByPetId() {
    this.spinner.showLoadingIndicator();
    this.petService.getOnlyUser(this.pet.id).subscribe(
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

  updatePet() {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '¡Sí, actualizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      this.toggleInfo();
      this.spinner.showLoadingIndicator();
      Pet.id = this.pet.id;
      Pet.name = this.petForm.value.name;
      Pet.sex = this.petForm.value.sex;
      Pet.birthdate = this.invertDateFormat(this.petForm.value.birthdate);
      Pet.specie = this.petForm.value.specie;
      Pet.race = this.petForm.value.race;
      Pet.weight = this.petForm.value.weight;
      Pet.user.id = this.user.id;
      console.log(Pet);
      this.petService.updatePet(Pet).subscribe(
        (res: any) => {
          this.spinner.hideLoadingIndicator();
          console.log(res)
        },
        (err: any) => {
          this.spinner.hideLoadingIndicator();
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido actualizar la mascota',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log(err);
        }
      );
    });
  }

  deletePet(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.showLoadingIndicator();
        this.getUserByPetId();
        this.petService.deletePet(id).subscribe(
          (res: any) => {
            this.spinner.hideLoadingIndicator();
            console.log(res);
            this.router.navigate([`/dashboard/indClient/${this.user.username}`]);
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La mascota ha sido eliminada.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          (err: any) => {
            this.spinner.hideLoadingIndicator();
            Swal.fire({
              title: 'Error',
              text: 'No se ha podido eliminar la mascota',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          }
        );
      }
    });
  }

  onClickRow(history: any) {
    this.router.navigate([`/dashboard/medical/${history.id}`]);
  }
}
