import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import Pet from 'src/app/models/Pet';
import User from 'src/app/models/User';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

  newPetForm!: FormGroup;

  listClients!: User[];
  user!: User;
  today = new Date();

  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  year = this.today.getFullYear();
  myControl = new FormControl<string | User>('');
  options: any[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;

  isLoadingClients = false;


  date: string = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private spinner: SpinnerService
  ) { }

  keyPress(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.newPetForm = this.initializeForm();
    this.getUsers('');
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      race: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      specie: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      color: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)]],
      size: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      userName: ['', [Validators.required]],
    });
  }

  getUsers(name: string) {
    this.listClients = [];
    let params = {
      name: '',
      idRole: 2,
    };
    this.isLoadingClients = true;
    this.userService.getAutoCompleteUsers(params).subscribe((data) => {
      this.listClients = data as User[];
      console.log(data);
      this.isLoadingClients = false;
    }), (error: any) => {
      this.isLoadingClients = false;
      console.log(error);
    }
  }

  setUser() {
    let tempUser = this.newPetForm.value.userName;
    console.log(tempUser)
    this.userService.getUserById(tempUser).subscribe((data) => {
      this.user = data as User;
    }), (error: any) => {
      console.log(error);
    }
  }

  onSubmit() {
    this.spinner.showLoadingIndicator();

    let birthdate = this.newPetForm.value.birthdate.split('-').reverse().join('-');

    let pet: Pet = {
      id: 0,
      name: this.newPetForm.value.name,
      lastName: this.user.lastName,
      race: this.newPetForm.value.race,
      specie: this.newPetForm.value.specie,
      sex: this.newPetForm.value.sex,
      color: this.newPetForm.value.color,
      onRegister: '',
      size: this.newPetForm.value.size,
      birthdate: birthdate,
      weight: this.newPetForm.value.weight,
      userId: this.newPetForm.value.userName,
      healthRecords: [],
    };

    /* console.log(pet); */

    /* this.petService.addPet(pet).subscribe((data: any) => {
      this.spinner.hideLoadingIndicator();
      Swal.fire({
        icon: 'success',
        text: 'Mascota agregada correctamente',
      });
      this.router.navigate([`/dashboard/pet/${data.id}`]);
    }), (error: any) => {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo agregar la mascota',
      });
      console.log(error);
    } */
  }

  goBack() {
    this.router.navigate(['dashboard/pets']);
  }

}
