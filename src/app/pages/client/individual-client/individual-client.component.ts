import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  direction: string;
}

@Component({
  selector: 'app-individual-client',
  templateUrl: './individual-client.component.html',
  styleUrls: ['./individual-client.component.css']
})
export class IndividualClientComponent implements OnInit {

  user!: User;
  userToEdit!: User;
  pets: any[] = [];
  editMode = false;
  editForm!: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private petsService: PetService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getUsersandPets();
    this.editForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^@.\n]*@[^@.\n]*\.[^@.\n]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(6)]],
      direction: ['', Validators.required],
    });
  }


  getUsersandPets() {
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('username')!).subscribe(
      (res: any) => {
        this.user = res;
        this.editForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          phone: this.user.phone,
          direction: this.user.direction
        });

        this.petsService.getPetsByUserId(res.id).subscribe(
          (res: any) => {
            this.pets = res.map((pet: any) => ({ ...pet, view: false })); // Agregar la propiedad 'view' a cada mascota
          }
        ), (err: any) => {
          console.log('error al traer las mascotas');
        }
      }
    ), (err: any) => {
      console.log('error al traer al usuario');
    }
  }

  goEditClient() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.spinner.showLoadingIndicator();
    this.userToEdit = {
      id: this.user.id,
      username: this.editForm.value.username,
      email: this.editForm.value.email,
      phone: this.editForm.value.phone,
      direction: this.editForm.value.direction
    }
    console.log(this.userToEdit);
    this.userService.updateUser(this.userToEdit).subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Cambios guardados',
          showConfirmButton: false,
          timer: 1000
        })
        this.user = this.userToEdit;
        this.router.navigate([`/dashboard/indClient/${this.editForm.value.username}`])
      }
    ), (err: any) => {
      this.spinner.hideLoadingIndicator();
      console.log('error al actualizar el usuario');
      Swal.fire({
        icon: 'error',
        text: 'No se pudieron guardar los cambios',
      })
    }
    this.editMode = false;
  }

  deleteClient() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará el cliente y todas sus mascotas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.showLoadingIndicator();
        this.userService.deleteUser(this.user.id).subscribe(
          (res: any) => {
            this.spinner.hideLoadingIndicator();
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Cliente eliminado',
              showConfirmButton: false,
              timer: 1000
            })
            this.router.navigate(['/dashboard/client'])
          }
        ), (err: any) => {
          this.spinner.hideLoadingIndicator();
          console.log('error al eliminar el usuario');
          Swal.fire({
            icon: 'error',
            text: 'No se pudo eliminar el cliente',
          })
        }
      }
    })
  }

  deletePet(pet: any) {
    console.log(pet.id);
  }

  back() {
    this.router.navigate(['/dashboard/client'])
  }

  goCreatePet() {
    this.router.navigate([`/dashboard/addPet`])
  }
}
