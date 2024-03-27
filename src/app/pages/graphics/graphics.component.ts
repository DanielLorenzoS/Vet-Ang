import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

interface WeekData {
  title: string;
  appointmentCount: number;
}

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion;

  usersData: any[] = [];
  dates: any[] = [];

  appointmentsToday = [
    {
      user: 'Juan Pérez',
      date: new Date('2024-03-23T10:00:00'),
      pet: 'Max',
      doctor: 'Dr. García',
      service: 'Vacunación'
    },
    {
      user: 'María Rodríguez',
      date: new Date('2024-03-23T11:30:00'),
      pet: 'Luna',
      doctor: 'Dra. Martínez',
      service: 'Consulta general'
    },
    {
      user: 'Pedro López',
      date: new Date('2024-03-23T12:45:00'),
      pet: 'Rocky',
      doctor: 'Dr. Sánchez',
      service: 'Esterilización'
    },
    {
      user: 'Ana García',
      date: new Date('2024-03-23T14:00:00'),
      pet: 'Milo',
      doctor: 'Dra. Hernández',
      service: 'Examen de laboratorio'
    },
    {
      user: 'Sofía Martínez',
      date: new Date('2024-03-23T15:30:00'),
      pet: 'Lucky',
      doctor: 'Dr. Pérez',
      service: 'Desparasitación'
    },
    {
      user: 'Jorge Gutiérrez',
      date: new Date('2024-03-23T16:45:00'),
      pet: 'Bella',
      doctor: 'Dra. Ramírez',
      service: 'Cirugía menor'
    },
    {
      user: 'Luisa Flores',
      date: new Date('2024-03-23T17:30:00'),
      pet: 'Simba',
      doctor: 'Dr. Morales',
      service: 'Chequeo dental'
    },
    {
      user: 'Roberto Vargas',
      date: new Date('2024-03-23T18:15:00'),
      pet: 'Toby',
      doctor: 'Dra. Cruz',
      service: 'Radiografía'
    },
    {
      user: 'Carolina Torres',
      date: new Date('2024-03-23T19:00:00'),
      pet: 'Coco',
      doctor: 'Dr. Ríos',
      service: 'Ultrasonido'
    },
    {
      user: 'Fernando Díaz',
      date: new Date('2024-03-23T20:00:00'),
      pet: 'Pelusa',
      doctor: 'Dra. Reyes',
      service: 'Consulta de dermatología'
    }
  ];
  

  openPanel = true;
  toTop = false;
  dNone = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.toTop = true;
    }, 3000);

    setTimeout(() => {
      this.dNone = true;
    }, 4000);
  }

  goAppointments() {
    this.router.navigate(['/dashboard/appointments']);
  }

  goAddAppointment() {
    this.router.navigate(['/dashboard/addAppointment']);
  }

  goAddClient() {
    this.router.navigate(['/dashboard/addClient']);
  }

  goAddPet() {
    this.router.navigate(['/dashboard/addPet']);
  }

}
