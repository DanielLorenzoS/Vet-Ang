import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Doctor {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  doctorForm!: FormGroup;
  doctor: Doctor = {} as Doctor;
  id!: number;
  listDoctors!: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private spinner: SpinnerService,
    private doctorService: DoctorService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.doctorForm = this.initializeForm();
    if (this.data.doctorId) {
      this.getDoctorById(this.data.doctorId);
      this.id = this.data.doctorId;
    }
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.spinner.showLoadingIndicator();
    this.doctor.id = this.id;
    this.doctor.name = this.doctorForm.value.name;
    this.doctor.lastname = this.doctorForm.value.lastname;
    this.doctor.email = this.doctorForm.value.email;
    this.doctor.phone = this.doctorForm.value.phone;
    this.doctor.status = this.doctorForm.value.status;
    console.log(this.doctor);
    this.doctorService.updateDoctor(this.doctor).subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        Swal.fire({
          icon: 'success',
          title: 'Médico actualizado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
        this.dialog.closeAll();
      }
    );
  }

  getDoctorById(id: number) {
    this.spinner.showLoadingIndicator();
    this.doctorService.getDoctorById(id).subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      this.doctorForm.patchValue(data);
    });
  }
}
