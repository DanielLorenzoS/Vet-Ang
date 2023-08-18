import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

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
  appointments: any[] = [];

  displayedColumns: string[] = ['user', 'pet', 'reason', 'status', 'type', 'date'];
  dataSource = new MatTableDataSource<any>(this.appointments); // Usa any como tipo genérico para la fuente de datos

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router,
    private spinner: SpinnerService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private translate: TranslateModule
  ) { }

  ngOnInit(): void {
    this.spinner.showLoadingIndicator();
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        this.appointments = res.map((appointment: any) => {
          const formattedDate = this.datePipe.transform(appointment.date, 'medium');
          console.log(formattedDate);
          const translatedDate = formattedDate ? this.translateMonth(formattedDate) : '';
          console.log(translatedDate);
          return {
            ...appointment,
            formattedDate: translatedDate
          };
        });
        console.log(this.appointments);
        this.dataSource = new MatTableDataSource<any>(this.appointments);
      },
      err => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    )
  }

  translateMonth(dateString: string): string {
    const monthTranslations: { [key: string]: string } = {
      'Jan': 'Ene',
      'Feb': 'Feb',
      'Mar': 'Mar',
      'Apr': 'Abr',
      'May': 'May',
      'Jun': 'Jun',
      'Jul': 'Jul',
      'Aug': 'Ago',
      'Sep': 'Sep',
      'Oct': 'Oct',
      'Nov': 'Nov',
      'Dec': 'Dic'
    };

    const englishMonths = Object.keys(monthTranslations).join('|');
    const regex = new RegExp(`(${englishMonths})\\s(\\d{1,2}),\\s(\\d{4}),\\s(\\d{1,2}:\\d{2}:\\d{2}\\s[APap][Mm])`);
    const match = dateString.match(regex);

    if (match) {
      const month = match[1];
      const translatedMonth = monthTranslations[month] || month;
      return `${translatedMonth} ${match[2]}, ${match[3]}, ${match[4]}`;
    }

    return dateString;
  }




  onRowClick(row: any) {
    console.log(row.username)
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtra los datos de la tabla
  }

  goNewClient() {
  }
}
