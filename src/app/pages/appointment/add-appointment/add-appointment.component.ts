import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  appointmentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      reason: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      userId: ['', Validators.required],
      petId: ['', Validators.required],
      doctorId: ['', Validators.required]
    });
  }

  addAppointment() {
    // Implement your logic to add the appointment here
  }
}
