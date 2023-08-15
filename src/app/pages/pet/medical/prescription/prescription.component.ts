import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Medicine {
  id: number;
  name: string;
  type: string;
  description: string;
  dose: string;
  via: string;
  interval: string;
}

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrescriptionComponent implements OnInit {

  title = 'angular-mat-table-example';

  prescriptionId!: number;
  diagnosis!: any;
  medicines!: any;

  constructor(
    private spinner: SpinnerService,
    private petService: PetService,
    private route: ActivatedRoute
  ) { }

  dataSource!: Medicine[];
  columnsToDisplay = ['medicines[0].name', 'via', 'interval', 'dose'];
  columnsHeaders = ['Nombre', 'Tipo', 'Intervalo', 'Dosis'];

  toggleRow(element: { expanded: boolean; }) {
    element.expanded = !element.expanded
  }

  ngOnInit(): void {

    this.spinner.showLoadingIndicator();
    this.route.queryParams.subscribe(params => {
      this.prescriptionId = params['id'] || null;
    });
    console.log(this.prescriptionId);
    this.getPrescriprionById(this.prescriptionId);
  }

  toggleMedicineExpand(medicine: any) {
    medicine.isExpanded = !medicine.isExpanded;
  }

  getPrescriprionById(id: number) {

    this.petService.getPrescriptionById(id).subscribe(
      (res: any) => {
        this.diagnosis = res;
        this.dataSource = res.relations;
        console.log(this.diagnosis);
        this.spinner.hideLoadingIndicator();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hideLoadingIndicator();
      }
    )
  }
}
