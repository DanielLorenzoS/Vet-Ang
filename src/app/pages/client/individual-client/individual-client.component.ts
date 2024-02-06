import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { Location } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';

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

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  user!: User;
  pets: any[] = [];
  editForm!: FormGroup;
  nombreArchivo: string = '';
  listaExcel: any[] = [];
  formulario!: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private petsService: PetService,
    private router: Router,
    private spinner: SpinnerService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //this.getUsersandPets();
    this.formulario = this.formBuilder.group({
      archivoCarga: [null], // Puedes inicializarlo con un valor predeterminado si es necesario
    });
  }

  seleccionarArchivoMovtos(event: any) {
    this.uploadExcelMovtos(event);

    this.nombreArchivo = event.target.files[0].name;
    console.log(this.nombreArchivo);
  }

  uploadExcelMovtos(datosExcel: any) {
    try {
      import('xlsx').then((xlsx) => {
        let workBook: any = null;
        let jsonData = null;
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          this.listaExcel = jsonData[Object.keys(jsonData)[0]] as any[];
          this.listaExcel.forEach((documento: any) => {
            if (documento['Encabezado6'].startsWith('Luz3')) {
              console.log('documento: ', documento);
            }
          });
        };
        reader.readAsBinaryString(datosExcel.target.files[0]);
      });
    } catch (excp) {
      console.log('error', excp);
    }
  }


  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '80%', // Personaliza el ancho según tus necesidades
      height: '90%', // Personaliza el alto según tus necesidades
      panelClass: 'dialog', // Personaliza la clase del diálogo
      data: { user: this.user } // Pasa los datos del usuario al diálogo
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
        console.log(res);
        this.spinner.hideLoadingIndicator();
      }
    ), (err: any) => {
      this.spinner.hideLoadingIndicator();
      console.log('error al traer al usuario');
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
    this.petsService.deletePet(pet.id).subscribe(
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
    )
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
