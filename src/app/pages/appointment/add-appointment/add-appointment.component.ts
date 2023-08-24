import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pet.service';
import { ServiceService } from 'src/app/services/service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

interface Appointment {
  date: string;
  services: {
    id: number;
  }[];
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
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  appointmentForm!: FormGroup;
  listUsers!: any[];
  listPets!: any[];
  listDoctors!: any[];
  listServices!: any[];
  appointment!: Appointment;
  appointmentHours: string[] = this.generateTimeIntervals("08:00 AM", "08:00 PM", 30);


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private petService: PetService,
    private serviceService: ServiceService,
    private appointmentService: AppointmentService,
    private spinnner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    /* this.spinnner.showLoadingIndicator(); */
    this.appointmentForm = this.fb.group({
      day: ['', Validators.required],
      hour: ['', Validators.required],
      service: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      user: ['', Validators.required],
      pet: ['', Validators.required],
      doctor: ['', Validators.required]
    });
    this.getUsers();
    this.getPets();
    this.getDoctors();
    this.getServices();
    this.appointment = {
      date: '',
      services: [],
      status: '',
      type: '',
      user: { id: 0 },
      pets: [],
      doctors: []
    };
  }


  generateTimeIntervals(startTime: string, endTime: string, intervalMinutes: number): string[] {
    const intervals: string[] = [];
    const start = new Date(`2023-08-21 ${startTime}`);
    const end = new Date(`2023-08-21 ${endTime}`);

    while (start <= end) {
      intervals.push(this.formatThisTime(start));
      start.setMinutes(start.getMinutes() + intervalMinutes);
    }

    return intervals;
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

  getServices() {
    this.serviceService.getServices().subscribe(
      (res: any) => {
        console.log(res);
        this.listServices = res;
      },
      err => console.log(err)
    )
  }

  addAppointment() {
    this.spinnner.showLoadingIndicator();

    const selectedDate = this.appointmentForm.get('day')?.value;
    const selectedTime = this.appointmentForm.get('hour')?.value;

    const formattedDate = this.formatDate(selectedDate);
    const formattedTime = this.formatTime(selectedTime);

    const combinedDateTime: string = `${formattedDate} ${formattedTime}`;
    this.appointment.date = combinedDateTime;
    console.log(this.appointmentForm.value)
    this.appointment.services = [{ id: this.appointmentForm.get('service')?.value }];
    this.appointment.status = this.appointmentForm.get('status')?.value;
    this.appointment.type = this.appointmentForm.get('type')?.value;
    this.appointment.user.id = this.appointmentForm.get('user')?.value;
    this.appointment.pets = [{ id: this.appointmentForm.get('pet')?.value }];
    this.appointment.doctors = [{ id: this.appointmentForm.get('doctor')?.value }];
    console.log(this.appointment)

    this.appointmentService.createAppointment(this.appointment).subscribe(
      (res: any) => {
        console.log(res);
        this.spinnner.hideLoadingIndicator();
        this.router.navigate(['dashboard/appointments']);
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
    console.log(time);
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const isPM = time.toLowerCase().includes('pm');

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }


    return `${this.twoDigits(hours)}:${this.twoDigits(minutes)}`;
  }

  twoDigits(value: number): string {
    return value < 10 ? `0${value}` : value.toString();

  }

}
