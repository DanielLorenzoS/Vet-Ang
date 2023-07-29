import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-step1',
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.css']
})
export class RegisterStep1Component implements OnInit {

  loginForm!: FormGroup;

  constructor(private userService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private loadingIndicatorService: SpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
    localStorage.clear();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^@.\n]*@[^@.\n]*\.[^@.\n]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(8)]],
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loadingIndicatorService.showLoadingIndicator();
    this.registerService.createUser(this.loginForm.value).subscribe(
      (response: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Se ha enviado un código de confirmación',
          showConfirmButton: false,
          timer: 3000
        });
        localStorage.setItem('email', this.loginForm.value.email);
        this.router.navigate(['/registro2']);
      },
      (error: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        console.log('error ', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al crear el usuario',
          showConfirmButton: false,
          timer: 2000
        });
      });
  }
}
