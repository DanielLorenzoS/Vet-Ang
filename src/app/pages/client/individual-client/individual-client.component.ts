import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-individual-client',
  templateUrl: './individual-client.component.html',
  styleUrls: ['./individual-client.component.css']
})
export class IndividualClientComponent implements OnInit {

  user: any;
  pets: any[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private petsService: PetService
  ) { }

  ngOnInit(): void {
    this.getUsersandPets();
  }

  getUsersandPets() {
    this.userService.getUserByUsername(this.route.snapshot.paramMap.get('username')!).subscribe(
      (res: any) => {
        this.user = res;
        console.log(res);
        this.petsService.getPetsByUserId(res.id).subscribe(
          (res: any) => {
            this.pets = res.map((pet: any) => ({ ...pet, view: false })); // Agregar la propiedad 'view' a cada mascota
            console.log(this.pets);
          }
        ), (err: any) => {
          console.log('error al traer las mascotas');
        }
      }
    ), (err: any) => {
      console.log('error al traer al usuario');
    }
  }

  goEditClient() {
    console.log(this.user.username);
  }

  goDeleteClient() {
    console.log(this.user.username);
  }

  togglePetView(pet: any) {
    pet.view = !pet.view; // Alternar la propiedad 'view' de la mascota
  }
}
