import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  newclientForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loadingIndicatorService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.newclientForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^@.\n]*@[^@.\n]*\.[^@.\n]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(6)]],
      city: ['', Validators.required],
      municipality: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loadingIndicatorService.showLoadingIndicator();
    this.userService.createClient(this.newclientForm.value).subscribe(
      (response: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente agregado con éxito',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/dashboard/client']);
      },
      (error: any) => {
        this.loadingIndicatorService.hideLoadingIndicator();
        console.log('error ', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al agregar al cliente',
          showConfirmButton: false,
          timer: 2000
        });
      });
  }

  back() {
    this.router.navigate(['/dashboard/client'])
  }
}
