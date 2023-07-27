import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private userService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }

  onSubmit(): void {
    this.userService.generateToken(this.loginForm.value).subscribe(
      (response: any) => {
        this.userService.login(response.token);
        this.userService.getCurrentUser().subscribe(
          (res: any) => {
            console.log('res ', res.authorities[0].authority);
            if (res.authorities[0].authority === 'ROLE_USER') {
              this.router.navigate(['/dashboard']);
            } else if (res.authorities[0].authority === 'ROLE_INVITED') {
              Swal.fire({
                icon: 'error',
                text: 'No has validado tu cuenta'
              });
              this.getEmailByUsername(this.loginForm.value.username);
              this.router.navigate(['/registro2']);
            }
          },
          (error: any) => {
            console.log('error ', error);
          }
        );
      },
      (error: any) => {
        console.log('error ', error);
        Swal.fire({
          icon: 'error',
          text: 'Usuario inexistente'
        });
      }
    );
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
