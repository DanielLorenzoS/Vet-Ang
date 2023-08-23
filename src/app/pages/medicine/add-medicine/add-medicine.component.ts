import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicineService } from 'src/app/services/medicine.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {
  medicineForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private medicineService: MedicineService,
    private spinner: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.medicineForm = this.initializeForm();
  }

  initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      fabricator: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.spinner.showLoadingIndicator();
    this.medicineService.createMedicine(this.medicineForm.value).subscribe((data) => {
      this.spinner.hideLoadingIndicator();
      Swal.fire({
        icon: 'success',
        title: 'Medicine created successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/dashboard/medicines']);
    }
    );
  }

}
