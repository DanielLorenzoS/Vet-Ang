import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { local } from 'd3-selection';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

interface Login {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  veterinaries: any[] = [
    { id: 1, name: 'Veterinaria 1' },
    { id: 2, name: 'Veterinaria 2' },
    { id: 3, name: 'Veterinaria 3' }
  ];

  constructor(private userService: LoginService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingIndicatorService: SpinnerService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
    localStorage.clear();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      veterinary: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s]+$/), Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/), Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    this.loadingIndicatorService.showLoadingIndicator();
    let user: Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userService.generateToken(user).subscribe(
      (response: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        if (response.token != null) {
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
                this.loginService.deleteToken();
              }
            },
            (error: any) => {
              this.loadingIndicatorService.hideLoadingIndicator();
              console.log('error ', error);
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Contraseña incorrecta'
          });
        }
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
