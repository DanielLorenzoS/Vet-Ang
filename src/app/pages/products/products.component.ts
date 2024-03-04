import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnInit {
  products: any = [];
  params: any = {
    page: 0,
    size: 5,
    sort: 'name,asc'
  }
  searchForm!: FormGroup;
  displayedColumns: string[] = ['name', 'entryDate', 'expirationDate', 'provider', 'price', 'category'];
  dataSource = new MatTableDataSource<any>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.initializeSearchForm();
    this.getProducts(this.params);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

  /* getClients(params: any) {
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
  }*/

  getProducts(params: any) {
    console.log(this.searchForm.value);
    if (this.searchForm.value.option === 'name' && this.searchForm.value.search) {
      params['name'] = this.searchForm.value.search;
    } else {
      delete params.name;
    }
    if (this.searchForm.value.option === 'entryDate' && this.searchForm.value.search) {
      params['entryDate'] = this.searchForm.value.search;
    } else {
      delete params.entryDate;
    }
    if (this.searchForm.value.option === 'expirationDate' && this.searchForm.value.search) {
      params['expirationDate'] = this.searchForm.value.search;
    } else {
      delete params.expirationDate;
    }
    if (this.searchForm.value.option === 'price' && this.searchForm.value.search) {
      params['price'] = this.searchForm.value.search;
    } else {
      delete params.price;
    }
    if (this.searchForm.value.option === 'category' && this.searchForm.value.search) {
      params['category'] = this.searchForm.value.search;
    } else {
      delete params.category;
    }

    console.log(params);
    this.spinner.showLoadingIndicator();
    this.products = [];
    this.productsService.getProductsByFilter(params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.spinner.hideLoadingIndicator();
        this.products = res.content;
        this.dataSource = new MatTableDataSource<any>(this.products);
        this.setupPaginator(res);
      },
      error: (err: any) => {
        this.spinner.hideLoadingIndicator();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo obtener los productos',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Reintentar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.getProducts(this.params);
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
    this.getProducts(this.params);
  }

  sortData(sortby: string) {
    if (this.params.sort === `${sortby},asc`) {
      this.params.sort = `${sortby},desc`;
    } else {
      this.params.sort = `${sortby},asc`;
    }
    this.getProducts(this.params);
  }

  searchProduct() {
    this.params.page = 0;
    this.getProducts(this.params);
  }

  resetForm() {
    this.searchForm.reset();
    this.searchForm.patchValue({ option: 'name' });
    this.getProducts(this.params);
  }

  onRowClick(row: any) {
    console.log(row)
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra los datos de la tabla
  }

}
