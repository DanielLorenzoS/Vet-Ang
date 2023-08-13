import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {

  symptomInput: string = '';
  symptoms: string[] = [];
  petI!: number;
  doctors: any[] = [];
  medicines: any[] = [];

  addSymptom() {
    if (this.symptomInput.trim() !== '') {
      this.symptoms.push(this.symptomInput);
      this.symptomInput = '';
    }
  }

  removeSymptom(symptom: string) {
    this.symptoms = this.symptoms.filter(s => s !== symptom);
  }

  diagnosis: any = {
    symtomps: '',
    diagnosis: '',
    status: '',
    creationDate: '',
    observations: '',
    pet: {
      id: this.petI
    },
    doctor: {
      id: ''
    },
    medicines: { id: '' }
  };
  sendDiagnosis: any = {
    symtomps: '',
    diagnosis: '',
    status: '',
    creationDate: '',
    observations: '',
    pet: {
      id: this.petI
    },
    doctors: [{ id: '' }],
    medicines: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.petI = this.diagnosis.pet.id = params['id'] || null;
    });
    this.getDoctors();
    this.getMedicines();
  }

  getMedicines() {
    this.spinnerService.showLoadingIndicator();
    this.petService.getMedicines().subscribe(
      (res: any) => {
        this.spinnerService.hideLoadingIndicator();
        this.medicines = res;
        console.log(this.medicines);
      },
      (err: any) => {
        this.spinnerService.hideLoadingIndicator();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al cargar los medicamentos',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }



  getDoctors() {
    this.spinnerService.showLoadingIndicator();
    this.petService.getDoctors().subscribe(
      (res: any) => {
        this.spinnerService.hideLoadingIndicator();
        this.doctors = res;
        console.log(this.doctors);
      },
      (err: any) => {
        this.spinnerService.hideLoadingIndicator();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al cargar los doctores',
          confirmButtonText: 'Aceptar'
        })
      }
    );
  }

  submitForm() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Agrega el cero al mes si es necesario
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    this.sendDiagnosis.creationDate = `${day}-${month}-${year}`;
    this.sendDiagnosis.birthdate = `${day}-${month}-${year}`;
    this.sendDiagnosis.symtomps = this.symptoms.join(', ');
    this.sendDiagnosis.pet.id = this.petI;
    this.sendDiagnosis.doctors[0].id = this.diagnosis.doctor.id;
    this.sendDiagnosis.diagnosis = this.diagnosis.diagnosis;
    this.sendDiagnosis.status = this.diagnosis.status;
    this.sendDiagnosis.observations = this.diagnosis.observations;
    this.diagnosis.medicines.forEach((medicine: any) => {
      this.sendDiagnosis.medicines.push({ id: medicine });
    });

    this.petService.createPrescription(this.sendDiagnosis).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Diagnóstico creado',
          text: 'El diagnóstico se ha creado correctamente',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate([`/dashboard/pet/${this.petI}`]);
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al crear el diagnóstico',
          confirmButtonText: 'Aceptar'
        })
      }
    );
    console.log(this.sendDiagnosis);
  }

}
