import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
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
    { url: 'https://spring-vet-production.up.railway.app', name: 'Veterinaria 2' },
    { url: 'https://localhost:8080', name: 'Veterinaria 3' }
  ];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
    localStorage.clear();
    this.loginService.url = '';
  }

  goLogin() {
    this.veterinary = this.loginForm.value.veterinary;
    this.loginService.url = this.veterinary;
    this.router.navigate(['/login']);
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      veterinary: ['', [Validators.required]]
    });
  }

}  
