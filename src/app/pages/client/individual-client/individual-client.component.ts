import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { BillsService } from 'src/app/services/bills.service';

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  city: string,
  municipality: string,
  number: number,
  createdAt: string,
  pets?: any[]
}

@Component({
  selector: 'app-individual-client',
  templateUrl: './individual-client.component.html',
  styleUrls: ['./individual-client.component.css']
})
export class IndividualClientComponent implements OnInit {

  user!: User;
  pets: any[] = [];
  editForm!: FormGroup;
  bills: any[] = [];

  constructor(
    private userService: UserService,
    private billsService: BillsService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsersandPets();
  }


  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '80%',
      height: '90%',
      panelClass: 'dialog',
      data: { user: this.user }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getUsersandPets();
    });
  }


  getUsersandPets() {
    this.spinner.showLoadingIndicator();
    this.user = { id: 0, name: '', lastName: '', email: '', phone: '', city: '', municipality: '', number: 0, createdAt: '', pets: [] };
    this.pets = [];
    this.userService.getUserById(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(
      (res: any) => {
        this.user = res;
        this.pets = res.pets;
        this.bills = res.bills;
        console.log(res);
        this.spinner.hideLoadingIndicator();
      }
    ), (err: any) => {
      this.spinner.hideLoadingIndicator();
      console.log('error al obtener al usuario');
    }
  }

  getBillsByUserId(id: any) {
    this.spinner.showLoadingIndicator();
    this.billsService.getBillByUserId(id).subscribe(
      (res: any) => {
        this.bills = res;
        console.log(res);
        this.spinner.hideLoadingIndicator();
      }
    ), (err: any) => {
      this.spinner.hideLoadingIndicator();
      Swal.fire({
        icon: 'error',
        text: 'No se pudieron obtener las facturas',
      })
    }
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
            this.router.navigate(['/dashboard/clients'])
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

  deletePet(pet: any, event: Event) {
    event.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará la mascota",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMascota(pet);
      }
    })
  }

  deleteMascota(pet: any) {
    this.spinner.showLoadingIndicator();
    /* this.petsService.deletePet(pet.id).subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Mascota eliminada',
          showConfirmButton: false,
          timer: 1000
        })
        this.pets = this.pets.filter(p => p.id !== pet.id);
      }, (err: any) => {
        this.spinner.hideLoadingIndicator();
        console.log('error al eliminar la mascota');
        Swal.fire({
          icon: 'error',
          text: 'No se pudo eliminar la mascota',
        })
      }
    ) */
  }

  goBack() {
    this.router.navigate(['dashboard/client']);
  }

  goCreatePet() {
    this.router.navigate([`/dashboard/addPet`])
  }

  goEditPet(pet: any) {
    this.router.navigate([`/dashboard/pet/${pet.id}`])
  }
}
