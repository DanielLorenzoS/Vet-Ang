import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Manejo de valores nulos o indefinidos
    console.log(value);

    const day = parseInt(value.substring(0, 2));
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthIndex = parseInt(value.substring(3, 5)) - 1;
    const year = parseInt(value.substring(6, 10));

    return `${day} de ${monthNames[monthIndex]} del ${year}`; 
  }
}
