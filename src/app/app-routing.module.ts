import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RegisterStep1Component } from './pages/register-step1/register-step1.component';
import { RegisterStep2Component } from './pages/register-step2/register-step2.component';
import { Recover1Component } from './pages/recover1/recover1.component';
import { Recover2Component } from './pages/recover2/recover2.component';
import { Recover3Component } from './pages/recover3/recover3.component';
import { NewClientComponent } from './pages/client/new-client/new-client.component';
import { IndividualClientComponent } from './pages/client/individual-client/individual-client.component';
import { AllClientsComponent } from './pages/client/all-clients/all-clients.component';
import { AddPetComponent } from './pages/pet/add-pet/add-pet.component';
import { PetComponent } from './pages/pet/pet/pet.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { AllPetsComponent } from './pages/pet/all-pets/all-pets.component';
import { AllAppointmentComponent } from './pages/appointment/all-appointment/all-appointment.component';
import { AppointmentComponent } from './pages/appointment/appointment/appointment.component';
import { AddAppointmentComponent } from './pages/appointment/add-appointment/add-appointment.component';
import { MedicalComponent } from './pages/pet/medical/medical/medical.component';
import { AddMedicalComponent } from './pages/pet/medical/add-medical/add-medical.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro1', component: RegisterStep1Component },
  { path: 'registro2', component: RegisterStep2Component },
  { path: 'recover1', component: Recover1Component },
  { path: 'recover2', component: Recover2Component },
  { path: 'recover3', component: Recover3Component },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
    children: [
      { path: '', component: GraphicsComponent, canActivate: [authGuard], pathMatch: 'full' },
      { path: 'client', component: AllClientsComponent, canActivate: [authGuard] },
      { path: 'addClient', component: NewClientComponent, canActivate: [authGuard] },
      { path: 'indClient/:username', component: IndividualClientComponent, canActivate: [authGuard] },
      { path: 'pets', component: AllPetsComponent, canActivate: [authGuard] },
      { path: 'medical/:id', component: MedicalComponent, canActivate: [authGuard] },
      { path: 'addMedical', component: AddMedicalComponent, canActivate: [authGuard] },
      { path: 'addPet', component: AddPetComponent, canActivate: [authGuard] },
      { path: 'pet/:id', component: PetComponent, canActivate: [authGuard] },
      { path: 'appointments', component: AllAppointmentComponent, canActivate: [authGuard] },
      { path: 'appointment', component: AppointmentComponent, canActivate: [authGuard] },
      { path: 'addAppointment', component: AddAppointmentComponent, canActivate: [authGuard] },
      { path: '**', redirectTo: 'graphics' }
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
