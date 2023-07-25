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
export class LoginComponent implements  OnInit {

  loginForm!: FormGroup;

  constructor(private userService: LoginService, 
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.initializeForm();
  }

  username!: string;
  password!: string;
  
  initializeForm(): FormGroup {
    return this.formBuilder.group({ 
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]], 
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    });
  }  

  onSubmit(): void {
    this.userService.generateToken(this.loginForm.value).subscribe(
      (response: any) => {
        console.log('response ', response);
        this.userService.login(response.token);
        this.userService.getCurrentUser().subscribe((res: any) => {
          this.router.navigate(['dashboard']);
        });
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          text: 'Usuario inexistente'
        });
      }
    );
  }
}
