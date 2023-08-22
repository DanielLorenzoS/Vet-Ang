import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

interface Appointment {
  date: string;
  reason: string;
  status: string;
  type: string;
  user: {
    id: number;
  };
  pets: {
    id: number;
  }[];
  doctors: {
    id: number;
  }[];
}

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  appointmentForm!: FormGroup;
  listUsers!: any[];
  listPets!: any[];
  listDoctors!: any[];
  appointment!: any;
  appointmentHours: string[] = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private appointmentService: AppointmentService,
    private spinnner: SpinnerService,
    private router: Router,
    public dialogRef: MatDialogRef<EditAppointmentComponent>
  ) { }

  ngOnInit() {
    /* this.spinnner.showLoadingIndicator(); */
    this.getAppointmentById(localStorage.getItem('appointmentId')!);
    this.getUsers();
    this.getPets();
    this.getDoctors();
    this.appointment = {
      id: '',
      date: '',
      reason: '',
      status: '',
      userId: '',
      petId: '',
      doctorId: ''
    };
    console.log(this.appointment.pets[0].id)
  }

  getAppointmentById(id: any) {
    this.appointmentService.getAppointmentWithUserAndPet(id).subscribe(
      (res: any) => {
        console.log(res.date);
        const dateString = res.date.split(' ')[0];
        const lastTwoCharacters = dateString.slice(-2);
        const dayOfMonth = parseInt(lastTwoCharacters, 10) + 1;

        const updatedDateString = dateString.slice(0, -2) + dayOfMonth.toString().padStart(2, '0');
        console.log(updatedDateString);


        this.appointmentForm = this.fb.group({
          day: [updatedDateString, Validators.required],
          hour: [res.date.split(' ')[1], Validators.required],
          reason: [res.reason, Validators.required],
          status: [res.status, Validators.required],
          user: [res.userId, Validators.required],
          pet: [res.petId, Validators.required],
          doctor: [res.doctorId, Validators.required]
        });
      },
      err => console.log(err)
    )
  }

  formatThisTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${this.padZero(hours % 12)}:${this.padZero(minutes)} ${ampm}`;
  }

  padZero(number: number): string {
    return (number < 10 ? '0' : '') + number;
  }

  getUsers() {
    this.userService.getUserByRole("CLIENT").subscribe(
      (res: any) => {
        this.listUsers = res;
      },
      err => console.log(err)
    )
  }

  getPets() {
    this.petService.getAllPets().subscribe(
      (res: any) => {
        this.listPets = res;
      },
      err => console.log(err)
    )
  }

  getDoctors() {
    this.petService.getDoctors().subscribe(
      (res: any) => {
        this.listDoctors = res;
      },
      err => console.log(err)
    )
  }

  updateAppointment() {
    this.spinnner.showLoadingIndicator();

    const selectedDate = this.appointmentForm.get('day')?.value;
    const selectedTime = this.appointmentForm.get('hour')?.value;

    const formattedTime = this.formatTime(selectedTime);
    const formattedDate = this.formatDate(new Date(selectedDate));
    console.log(formattedDate);

    const combinedDateTime: string = `${formattedDate} ${formattedTime}`;
    this.appointment.date = combinedDateTime;
    console.log(combinedDateTime)
    this.appointment.id = parseInt(localStorage.getItem('appointmentId')!, 10);
    this.appointment.date = combinedDateTime;
    this.appointment.reason = this.appointmentForm.get('reason')?.value;
    this.appointment.status = this.appointmentForm.get('status')?.value;
    this.appointment.userId = this.appointmentForm.get('user')?.value;
    this.appointment.petId = this.appointmentForm.get('pet')?.value;
    this.appointment.doctorId = this.appointmentForm.get('doctor')?.value;
    console.log(this.appointment)

    this.appointmentService.updateAppointment(this.appointment).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['dashboard/appointments']);
        });
        this.dialogRef.close();
        this.spinnner.hideLoadingIndicator();
      },
      err => {
        this.spinnner.hideLoadingIndicator();
        console.log(err)
      }
    )
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.twoDigits(date.getMonth() + 1);
    const day = this.twoDigits(date.getDate());

    return `${year}-${month}-${day}`;
  }

  formatTime(time: string): string {
    const newTime = time.slice(0, -3);
    return newTime;
  }



  twoDigits(value: number): string {
    return value < 10 ? `0${value}` : value.toString();

  }
}
