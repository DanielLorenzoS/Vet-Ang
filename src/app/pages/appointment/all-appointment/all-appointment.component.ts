import { Component } from '@angular/core';

export interface Appointment {
  id: number;
  clientName: string;
  petName: string;
  date: string;
}

const APPOINTMENTS_DATA: Appointment[] = [
  { id: 1, clientName: 'Juan Pérez', petName: 'Luna', date: '2023-08-20T10:00:00Z' },
  { id: 2, clientName: 'María Rodríguez', petName: 'Max', date: '2023-08-21T15:30:00Z' },
  { id: 3, clientName: 'Carlos Gómez', petName: 'Buddy', date: '2023-08-22T09:45:00Z' },
  { id: 4, clientName: 'Ana López', petName: 'Milo', date: '2023-08-23T11:15:00Z' },
  { id: 5, clientName: 'Luis Torres', petName: 'Coco', date: '2023-08-24T14:00:00Z' }
];

@Component({
  selector: 'app-all-appointment',
  templateUrl: './all-appointment.component.html',
  styleUrls: ['./all-appointment.component.css']
})
export class AllAppointmentComponent {
  displayedColumns: string[] = ['id', 'clientName', 'petName', 'date'];
  dataSource = APPOINTMENTS_DATA;
}
