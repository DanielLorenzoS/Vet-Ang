import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import { EditPetComponent } from '../edit-pet/edit-pet.component';
import { Location } from '@angular/common';

interface Pet {
  id: number,
  name: string,
  sex: string,
  birthdate: string,
  specie: string,
  race: string,
  weight: string,
  user: {
    id: number
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
  prescriptions: any = {};
  showInfo: boolean = true;
  petForm!: FormGroup;
  id: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(
    private petService: PetService,
    private spinner: SpinnerService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    
  }

  /* openEditDialog(): void {
    const dialogRef = this.dialog.open(EditPetComponent, {
      width: '80%', // Personaliza el ancho según tus necesidades
      data: { pet: this.pet, user: this.user } // Pasa los datos del usuario al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getPet();
    });
  }

  invertDateFormat(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts[0].length === 4)
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    return dateStr;
  }



  editMedicalHistory(history: any) {
    this.router.navigate(['/pet/edit-medical-history', history.id]);
  }

  deletePrescription(id: number, event: Event) {
    event.stopPropagation();
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
        this.petService.deletePrescription(id).subscribe(
          (res: any) => {
            this.spinner.hideLoadingIndicator();
            console.log(res);
            this.getPet();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La prescripción ha sido eliminada.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          (err: any) => {
            this.spinner.hideLoadingIndicator();
            Swal.fire({
              title: 'Error',
              text: 'No se ha podido eliminar la prescripción',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          }
        );
      }
    });
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  addPrescription() {
    this.router.navigate(['/dashboard/addPrescription'], { queryParams: { id: this.pet.id } });
  }

  getUserByPetId(id: number) {
    console.log(id)
    this.spinner.showLoadingIndicator();
    this.petService.getOnlyUser(id).subscribe(
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

  onClickRow(prescription: any) {
    this.router.navigate(['/dashboard/prescription'], { queryParams: { id: prescription.id } });
  }

  goBack() {
    this.router.navigate(['dashboard/pets']);
  }
   */
}
