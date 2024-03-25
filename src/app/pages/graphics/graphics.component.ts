import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pet.service';
import { ServiceService } from 'src/app/services/service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

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

  single: any[] = [
    {
      name: 'Enero',
      value: 100,
    },
    {
      name: 'Febrero',
      value: 200,
    },
    {
      name: 'Marzo',
      value: 300,
    },
    {
      name: 'Abril',
      value: 400,
    },
  ];

  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion;

  barChartData: any[] = [
    {
      name: 'Perros',
      value: 0,
    },
    {
      name: 'Gatos',
      value: 0,
    },
    {
      name: 'Otros',
      value: 0,
    },
  ];

  usersData: any[] = [];
  areaChartData: any[] = [
    {
      name: 'Usuarios',
      series: []
    },
  ];
  dates: any[] = [];

  pieChartData: any[] = [];
  gridChartData: any[] = [];

  countDogs!: number;
  countCats!: number;
  countOthers!: number;

  weekData: WeekData[] = [];
  lineChartData: any[] = [];

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
    private router: Router,
    private petService: PetService,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private serviceService: ServiceService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    /* this.spinnerService.showLoadingIndicator();
    this.getSpecies();
    this.getUsers();
    this.getMedicinesCount();
    this.getServicesCount();
    this.getAppointments();
    this.getAppointmentsToday(); */
    setTimeout(() => {
      this.toTop = true;
    }, 5000);

    setTimeout(() => {
      this.dNone = true;
    }, 6000);
  }

  getSpecies() {
    /* this.petService.countSpecies().subscribe(
      (res: any) => {
        this.countDogs = res.dogs;
        this.countCats = res.cats;
        this.countOthers = res.others;

        this.barChartData = [
          {
            name: 'Perros',
            value: this.countDogs,
          },
          {
            name: 'Gatos',
            value: this.countCats,
          },
          {
            name: 'Otros',
            value: this.countOthers,
          },
        ];
        console.log(this.barChartData);
      },
      err => console.log(err)
    ); */
  }

  getUsers() {
    this.userService.getAllUsers({ page: 0, size: 5 }).subscribe(
      (users: any) => {
        this.usersData = users;
        this.processUserData();

      },
      err => console.log(err)
    );
  }


  processUserData() {
    this.usersData.forEach((user: any) => {
      if (user.createdAt) {
        this.dates.push(user.createdAt);
      }
    });

    const usersByMonth: Record<string, number> = {};

    this.dates.forEach((data: any) => {
      const createdAtDate: string = data;
      const month = createdAtDate.substring(3, 5);
      usersByMonth[month] = (usersByMonth[month] || 0) + 1;
      this.getMonthName(Number(month));
    });

    const seriesData = Object.keys(usersByMonth).map(monthStr => {
      const monthName = this.getMonthName(Number(monthStr));
      const value = usersByMonth[monthStr];
      return { name: monthName, value: value };
    });

    this.areaChartData = [
      {
        name: 'Clientes',
        series: seriesData.reverse()
      },
    ];
  }

  getMonthName(monthNumber: number) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthNumber - 1];
  }

  getMedicinesCount() {
    /* this.petService.countMedicines().subscribe(
      (res: any) => {
        this.pieChartData = res;
        console.log(this.pieChartData);
      },
      err => console.log(err)
    ); */
  }

  getServicesCount() {
    this.serviceService.countServices().subscribe(
      (res: any) => {
        this.gridChartData = res;
        const firstThreeItems = this.gridChartData.slice(0, 3);
        console.log(firstThreeItems);
        this.gridChartData = firstThreeItems;
      },
      err => console.log(err)
    );
  }

  getAppointmentsToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    this.appointmentService.getAppointmentsAny().subscribe(
      (appointments: any[]) => {
        console.log(appointments);
        this.appointmentsToday = appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
  
          // Filtrar por fecha y por estatus
          const isToday = appointmentDate.getDate() === today.getDate() &&
                          appointmentDate.getMonth() === today.getMonth() &&
                          appointmentDate.getFullYear() === today.getFullYear();
  
          const validStatus = ["Finalizada", "Cancelada por el cliente", "Cancelada por el veterinario"].indexOf(appointment.status) === -1;
  
          return isToday && validStatus;
        });
        console.log(this.appointmentsToday);
        this.accordion.openAll();
        this.spinnerService.hideLoadingIndicator();
      },
      err => console.log(err)
    );
  }
  

  getAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (res: any) => {
        this.proccessWeekData(res);
        
      },
      err => console.log(err)
    );
  }

  proccessWeekData(res: any) {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const beforeLastMonth = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);
    console.log(currentDate.getMonth() + 1);
    console.log(lastMonth.getMonth() + 1);
    console.log(beforeLastMonth.getMonth() + 1);

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;

    res.forEach((appointment: any) => {
      if (Number(appointment.date.substring(6, 7)) === currentDate.getMonth() + 1) {
        count1++;
      }
      if (Number(appointment.date.substring(6, 7)) === lastMonth.getMonth() + 1) {
        count2++;
      }
      if (Number(appointment.date.substring(6, 7)) === beforeLastMonth.getMonth() + 1) {
        count3++;
      }
    });
    this.weekData.push({ title: this.getMonthName(Number(currentDate.getMonth() + 1)), appointmentCount: count1 });
    this.weekData.push({ title: this.getMonthName(Number(lastMonth.getMonth() + 1)), appointmentCount: count2 });
    this.weekData.push({ title: this.getMonthName(Number(beforeLastMonth.getMonth() + 1)), appointmentCount: count3 });
    this.weekData = this.weekData.reverse();
    const seriesData = this.weekData.map(week => {
      return { name: week.title, value: week.appointmentCount };
    });
  
    this.lineChartData = [
      {
        name: 'Semanas',
        series: seriesData
      }
    ];
  }


  // Otras opciones de configuración para el gráfico
  colorScheme = 'nightLights';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = '';

  showLabels = true;
  labelFormatting = (value: number) => `${value}%`;
  explodeSlices = false;
  doughnut = true;
  legend = true;
  legendPosition = 'below';

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
