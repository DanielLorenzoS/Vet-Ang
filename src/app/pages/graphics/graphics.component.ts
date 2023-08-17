import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

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

  countDogs!: number;
  countCats!: number;
  countOthers!: number;

  constructor(
    private router: Router,
    private petService: PetService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getSpecies();
    this.getUsers();
    this.getMedicinesCount();
  }

  getSpecies() {
    this.petService.countSpecies().subscribe(
      (res: any) => {
        console.log(res);
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
    );
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
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
    this.petService.countMedicines().subscribe(
      (res: any) => {
        console.log(res);
        this.pieChartData = res;
        
      },
      err => console.log(err)
    );
  }


  // Otras opciones de configuración para el gráfico
  colorScheme = 'nightLights';
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = '';
  yAxisLabel = '';


  lineChartData = [
    {
      name: 'Serie 1',
      series: [
        { name: 'Dato 1', value: 10 },
        { name: 'Dato 2', value: 20 },
        { name: 'Dato 3', value: 15 }
      ]
    },
    {
      name: 'Serie 2',
      series: [
        { name: 'Dato 1', value: 5 },
        { name: 'Dato 2', value: 30 },
        { name: 'Dato 3', value: 10 }
      ]
    },
    {
      name: 'Serie 3',
      series: [
        { name: 'Dato 1', value: 15 },
        { name: 'Dato 2', value: 10 },
        { name: 'Dato 3', value: 25 }
      ]
    }
  ];

  

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

}
