import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent {

  pet: any = {};
  medicalHistories: any = {};
  id: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(
    private petService: PetService,
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.spinner.showLoadingIndicator();
    this.petService.getPetById(this.id).subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(res);
        this.pet = res;
        this.medicalHistories = res.medicalHistories;
      },
      (err: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    );
  }
  
  editMedicalHistory(history: any) {
    this.router.navigate(['/pet/edit-medical-history', history.id]);
  }

  deleteMedicalHistory(history: any) {
    /* this.spinner.showLoadingIndicator();
    this.petService.deleteMedicalHistory(history.id).subscribe(
      (res: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(res);
        this.getPets();
      },
      (err: any) => {
        this.spinner.hideLoadingIndicator();
        console.log(err);
      }
    ); */
  }

  addMedicalHistory() {
    this.router.navigate(['/pet/add-medical-history', this.id]);
  }
    
}
