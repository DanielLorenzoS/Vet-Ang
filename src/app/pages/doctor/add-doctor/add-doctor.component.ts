import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  doctorForm!: FormGroup;
  listDoctors!: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private spinner: SpinnerService,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.initializeForm();
    this.getDoctors();
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
    this.doctorService.createDoctor(this.doctorForm.value).subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      Swal.fire({
        icon: 'success',
        title: 'Doctor creado con éxito',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['dashboard/doctors']);
    }
    );
  }

  getDoctors() {
    this.spinner.showLoadingIndicator();
    this.doctorService.getDoctors().subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      this.listDoctors = data;
    });
  }
}
