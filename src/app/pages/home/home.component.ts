import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoginService } from 'src/app/services/login.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { PetService } from 'src/app/services/pet.service';
import { RegisterService } from 'src/app/services/register.service';
import { ServiceService } from 'src/app/services/service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginForm!: FormGroup;
  veterinary: string = '';

  veterinaries: any[] = [
    { url: 'https://spring-vet-production.up.railway.app', name: 'Veterinaria 1' },
    { url: 'https://spring-vet-production-f8a0.up.railway.app', name: 'Veterinaria 2' },
    { url: 'https://localhost:8080', name: 'Veterinaria 3' }
  ];

  constructor(
    private urlService: UrlService,
    private loginService: LoginService,
    private petService: PetService,
    private appoinmentService: AppointmentService,
    private doctorService: DoctorService,
    private medicineService: MedicineService,
    private registerService: RegisterService,
    private serviceService: ServiceService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
    localStorage.clear();
  }

  goLogin() {
    this.urlService.setUrl(this.loginForm.value.veterinary);
    this.petService.url = this.urlService.getUrl();
    this.loginService.url = this.urlService.getUrl();
    /* this.appoinmentService.url = this.veterinary;
    this.doctorService.url = this.veterinary;
    this.medicineService.url = this.veterinary;
    this.registerService.url = this.veterinary;
    this.serviceService.url = this.veterinary;
    this.userService.url = this.veterinary; */
    this.router.navigate(['/login']);
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      veterinary: ['', [Validators.required]]
    });
  }

}  
