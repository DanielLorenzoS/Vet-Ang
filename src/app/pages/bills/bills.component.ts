import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';
import {BillsService} from "../../services/bills.service";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements AfterViewInit, OnInit {
  bills: any[] = []; // Inicializa el arreglo vacío
  params: any = {
    page: 0,
    size: 5,
    sort: 'name,asc'
  }
  searchForm!: FormGroup;
  displayedColumns: string[] = ['concept', 'createdAt', 'paymentMethod', 'paymentStatus'];
  dataSource = new MatTableDataSource<any>(this.bills);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private billsService: BillsService,
    private router: Router,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getBills(this.params);
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
      option: new FormControl('paymentMethod')
    });
  }

  isSearchDisabled() {
    const { search } = this.searchForm.value;
    return !search || search.length === 0;
  }

  /*getClients(params: any) {
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
    if (this.searchForm.value.option === 'email' && this.searchForm.value.search) {
      params['email'] = this.searchForm.value.search;
    } else {
      delete params.email;
    }
    if (this.searchForm.value.option === 'phone' && this.searchForm.value.search) {
      params['phone'] = this.searchForm.value.search;
    } else {
      delete params.phone;
    }

    console.log(params);
    this.spinner.showLoadingIndicator();
    this.usuarios = [];
    this.userService.getAllUsers(params).subscribe({
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
            this.getClients(this.params);
          }
        })
      }
    });
  } */

  getBills(params: any) {
    console.log(this.searchForm.value);
    if (this.searchForm.value.option === 'paymentMethod' && this.searchForm.value.search) {
      params['paymentMethod'] = this.searchForm.value.search;
    } else {
      delete params.paymentMethod;
    }
    if (this.searchForm.value.option === 'paymentStatus' && this.searchForm.value.search) {
      params['paymentStatus'] = this.searchForm.value.search;
    } else {
      delete params.paymentStatus;
    }

    console.log(params);
    this.spinner.showLoadingIndicator();
    this.bills = [];
    this.billsService.getBills(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.spinner.hideLoadingIndicator();
        this.bills = res.content;
        this.dataSource = new MatTableDataSource<any>(this.bills);
        this.setupPaginator(res);
      },
      error: (err: any) => {
        this.spinner.hideLoadingIndicator();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo obtener las facturas',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Reintentar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.getBills(this.params);
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
    this.getBills(this.params);
  }

  sortData(sortby: string) {
    if (this.params.sort === `${sortby},asc`) {
      this.params.sort = `${sortby},desc`;
    } else {
      this.params.sort = `${sortby},asc`;
    }
    this.getBills(this.params);
  }

  searchBill() {
    this.getBills(this.params);
  }

  resetForm() {
    this.searchForm.reset();
    this.searchForm.patchValue({ option: 'name' });
    this.getBills(this.params);
  }

  /* deleteUser(id: number) {
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
    console.log(row)
    this.router.navigate([`dashboard/indClient/${row.id}`])
  } */

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra los datos de la tabla
  }

  /* goNewClient() {
    this.router.navigate(['dashboard/addClient'])
  } */

}
