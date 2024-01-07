import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements AfterViewInit, OnInit {
  usuarios: any[] = []; // Inicializa el arreglo vacío
  params: any = {
    page: 0,
    size: 5
  }
  searchForm!: FormGroup;
  displayedColumns: string[] = ['id', 'username', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<any>(this.usuarios); // Usa any como tipo genérico para la fuente de datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm();
  }

  ngAfterViewInit(): void {
    this.spinner.showLoadingIndicator();
    this.getClients(this.params);
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      name: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null)
    });
  }

  isSearchDisabled() {
    const name = this.searchForm.get('name')?.value;
    const lastName = this.searchForm.get('lastName')?.value;
    const email = this.searchForm.get('email')?.value;
    const phone = this.searchForm.get('phone')?.value;

    return !name && !lastName && !email && !phone;
}

  getClients(params: any) {
    this.usuarios = [];
    this.userService.getAllUsers(params).subscribe({
      next: (res: any) => {
        this.spinner.hideLoadingIndicator();
        this.usuarios = res.content;
        this.dataSource = new MatTableDataSource<any>(this.usuarios);
        this.setupPaginator(res);
        console.log(res);
      },
      error: (err: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    });
  }

  setupPaginator(res: any) {
    this.paginator.length = res.totalElements;
    this.paginator.getNumberOfPages = () => res.totalPages;
    this.paginator.pageIndex = res.number;
    this.paginator.pageSize = res.size;

    this.paginator.hasPreviousPage = () => !res.first;
    this.paginator.hasNextPage = () => !res.last;
  }

  pageEvent(event: any) {
    console.log(event);
    this.params.page = event.pageIndex;
    this.params.size = event.pageSize;
    this.getClients(this.params);
  }

  searchClient() {
    console.log(this.searchForm.value);
    /* this.params.name = this.searchForm.value.name;
    this.params.lastName = this.searchForm.value.lastName;
    this.params.email = this.searchForm.value.email;
    this.params.phone = this.searchForm.value.phone;
    this.getClients(this.params); */
  }

  deleteUser(id: number) {
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
        this.userService.deleteUser(id).subscribe(
          (res: any) => {
            this.spinner.hideLoadingIndicator();
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: 'Cliente eliminado',
              showConfirmButton: false,
              timer: 1000
            })
            this.getClients(this.params);
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

  onRowClick(row: any) {
    console.log(row.username)
    this.router.navigate([`dashboard/indClient/${row.username}`])
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra los datos de la tabla
  }

  goNewClient() {
    this.router.navigate(['dashboard/addClient'])
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
