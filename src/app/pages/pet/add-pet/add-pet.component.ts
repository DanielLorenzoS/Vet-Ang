import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

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

  onSubmit() {
    console.log('Formulario enviado');
  }

  back() {
    this.router.lastSuccessfulNavigation;
    console.log('Regresando');
  }
}
