import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.css']
})
export class AllPetsComponent {

  pets: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'race', 'specie', 'user'];
  dataSource = new MatTableDataSource<any>(this.pets);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private petService: PetService,
    private userService: UserService,
    private router: Router,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.showLoadingIndicator();
    this.petService.getPetsWithUser().subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        this.pets = res;
        this.dataSource = new MatTableDataSource<any>(this.pets);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    )
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
      },
      err => {
        console.log(err);
      }
    )
  }

  onRowClick(row: any) {
    console.log(row.username)
    this.router.navigate([`dashboard/pet/${row.id}`])
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra los datos de la tabla
  }

  goNewPet() {
    this.router.navigate(['dashboard/addPet'])
  }
}
