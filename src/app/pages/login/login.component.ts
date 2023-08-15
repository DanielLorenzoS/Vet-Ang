import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private userService: LoginService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingIndicatorService: SpinnerService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

  onSubmit(): void {
    this.loadingIndicatorService.showLoadingIndicator();
    this.userService.generateToken(this.loginForm.value).subscribe(
      (response: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        this.userService.login(response.token);
        this.userService.getCurrentUser().subscribe(
          (res: any) => {
            console.log('res ', res.authorities[0].authority);
            if (res.authorities[0].authority === 'ROLE_EMPLOYEE' || res.authorities[0].authority === 'ROLE_ADMIN') {
              this.loadingIndicatorService.hideLoadingIndicator();
              Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Has iniciado sesión correctamente',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/dashboard']);
            } else if (res.authorities[0].authority === 'ROLE_INVITED') {
              this.loadingIndicatorService.hideLoadingIndicator();
              Swal.fire({
                icon: 'error',
                text: 'No has validado tu cuenta'
              });
              this.getEmailByUsername(this.loginForm.value.username);
              this.router.navigate(['/registro2']);
            } else if (res.authorities[0].authority === 'ROLE_USER') {
              Swal.fire({
                icon: 'warning',
                title: 'No tienes permisos para acceder',
                text: 'Contacta con el administrador',
                showConfirmButton: true,
              });
            }
          },
          (error: any) => {
            this.loadingIndicatorService.hideLoadingIndicator();
            console.log('error ', error);
          }
        );
      },
      (error: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        console.log('error ', error);
        Swal.fire({
          icon: 'error',
          text: 'Usuario inexistente'
        });
      }
    );
  }

  /* login() {
    this.loadingIndicatorService.showLoadingIndicator();
    this.loginService.login(this.loginForm.value).subscribe(() => {
      this.loadingIndicatorService.hideLoadingIndicator();
      this.loginService.setLoggedState("true"),
      this.router.navigate(['/dashboard'])
    }, (error: any) => {
      this.loadingIndicatorService.hideLoadingIndicator();
      console.log('error ', error);
      Swal.fire({
        icon: 'error',
        text: 'Usuario inexistente'
      });
    });
  } */

  logout() {
    console.log(this.loginService.logout());
  }


  getEmailByUsername(username: String) {
    this.userService.getEmailUser(username).subscribe(
      (res: any) => {
        localStorage.setItem('email', res.email);
      },
      (error: any) => {
        console.log('error email ', error);
      }
    );
  }
}  
