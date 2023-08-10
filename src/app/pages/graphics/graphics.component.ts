import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent {

  constructor(
    private router: Router
  ) { }

  barChartData = [
    {
      name: 'Perros',
      value: 15,
    },
    {
      name: 'Gatos',
      value: 25,
    },
    {
      name: 'Otros',
      value: 10,
    },
  ];

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

  pieChartData = [
    { name: 'Amoxicilina', value: 25 },
    { name: 'Metacam', value: 40 },
    { name: 'Fenobarbital', value: 30 },
    // Agregar más categorías con sus respectivos valores
  ];

  showLabels = true;
  labelFormatting = (value: number) => `${value}%`;
  explodeSlices = false;
  doughnut = true;
  legend = true;

  areaChartData = [
    {
      name: 'Serie 1',
      series: [
        { name: 'Enero', value: 10 },
        { name: 'Febrero', value: 20 },
        { name: 'Marzo', value: 15 },
        { name: 'Abril', value: 5 },
        { name: 'Mayo', value: 30 },
        // Agregar más datos de la serie 1
      ]
    },
    // Puedes agregar más series de datos si es necesario
  ];

  goAppointments() {
    this.router.navigate(['/dashboard/appointments']);
  }

  goAddAppointment() {
    this.router.navigate(['/dashboard/addAppointment']);
  }

}
