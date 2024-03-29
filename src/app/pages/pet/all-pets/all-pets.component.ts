import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent implements AfterViewInit, OnInit {
  usuarios: any[] = []; // Inicializa el arreglo vacío
  params: any = {
    page: 0,
    size: 5,
    sort: 'name,asc'
  }
  searchForm!: FormGroup;
  displayedColumns: string[] = ['name', 'specie', 'race', 'sex'];
  dataSource = new MatTableDataSource<any>(this.usuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private petService: PetService,
    private router: Router,
    private location: Location,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getPets(this.params);
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
      option: new FormControl('name')
    });
  }

  isSearchDisabled() {
    const { search } = this.searchForm.value;
    return !search || search.length === 0;
  }

  getPets(params: any) {
    console.log(this.searchForm.value);
    if (this.searchForm.value.option === 'name' && this.searchForm.value.search) {
      params['name'] = this.searchForm.value.search;
    } else {
      delete params.name;
    }
    if (this.searchForm.value.option === 'lastName' && this.searchForm.value.search) {
      params['lastName'] = this.searchForm.value.search;
    } else {
      delete params.lastName;
    }
    if (this.searchForm.value.option === 'specie' && this.searchForm.value.search) {
      params['specie'] = this.searchForm.value.search;
    } else {
      delete params.specie;
    }
    if (this.searchForm.value.option === 'race' && this.searchForm.value.search) {
      params['race'] = this.searchForm.value.search;
    } else {
      delete params.race;
    }
    if (this.searchForm.value.option === 'sex' && this.searchForm.value.search) {
      params['sex'] = this.searchForm.value.search;
    } else {
      delete params.sex;
    }

    console.log(params);
    this.spinner.showLoadingIndicator();
    this.usuarios = [];
    this.petService.getPetsByFilter(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.spinner.hideLoadingIndicator();
        this.usuarios = res.content;
        this.dataSource = new MatTableDataSource<any>(this.usuarios);
        this.setupPaginator(res);
      },
      error: (err: any) => {
        this.spinner.hideLoadingIndicator();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo obtener los clientes',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Reintentar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.getPets(this.params);
          }
        })
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
    this.params.page = event.pageIndex;
    this.params.size = event.pageSize;
    this.getPets(this.params);
  }

  sortData(sortby: string) {
    if (this.params.sort === `${sortby},asc`) {
      this.params.sort = `${sortby},desc`;
    } else {
      this.params.sort = `${sortby},asc`;
    }
    this.getPets(this.params);
  }

  searchClient() {
    this.getPets(this.params);
  }

  resetForm() {
    this.searchForm.reset();
    this.searchForm.patchValue({ option: 'name' });
    this.getPets(this.params);
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
            this.getPets(this.params);
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
    console.log(row)
    this.router.navigate([`dashboard/client/${row.id}`])
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra los datos de la tabla
  }

  goNewClient() {
    this.router.navigate(['dashboard/client'])
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
