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
import { AddPrescriptionComponent } from './pages/pet/medical/add-prescription/add-prescription.component';
import { PrescriptionComponent } from './pages/pet/medical/prescription/prescription.component';
import { EmployeesComponent } from './pages/employee/employees/employees.component';
import { AllDoctorsComponent } from './pages/doctor/all-doctors/all-doctors.component';
import { DoctorComponent } from './pages/doctor/doctor/doctor.component';
import { AddDoctorComponent } from './pages/doctor/add-doctor/add-doctor.component';
import { MedicineComponent } from './pages/medicine/medicine/medicine.component';
import { AddMedicineComponent } from './pages/medicine/add-medicine/add-medicine.component';
import { AllMedicinesComponent } from './pages/medicine/all-medicines/all-medicines.component';
import { ServiceComponent } from './pages/service/service/service.component';
import { AddServiceComponent } from './pages/service/add-service/add-service.component';
import { AllServiceComponent } from './pages/service/all-service/all-service.component';
import { DeletedAppointmentComponent } from './pages/appointment/deleted-appointment/deleted-appointment.component';

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
      { path: 'deletedAppointments', component: DeletedAppointmentComponent, canActivate: [authGuard] },
      { path: 'appointment', component: AppointmentComponent, canActivate: [authGuard] },
      { path: 'addAppointment', component: AddAppointmentComponent, canActivate: [authGuard] },
      { path: 'doctors', component: AllDoctorsComponent, canActivate: [authGuard] },
      { path: 'doctor/:id', component: DoctorComponent, canActivate: [authGuard] },
      { path: 'addDoctor', component: AddDoctorComponent, canActivate: [authGuard] },
      { path: 'medicines', component: AllMedicinesComponent, canActivate: [authGuard] },
      { path: 'addMedicines', component: AddMedicineComponent, canActivate: [authGuard] },
      { path: 'services', component: AllServiceComponent, canActivate: [authGuard] },
      { path: 'addService', component: AddServiceComponent, canActivate: [authGuard] },
      { path: 'prescription', component: PrescriptionComponent, canActivate: [authGuard] },
      { path: 'addPrescription', component: AddPrescriptionComponent, canActivate: [authGuard] },
      { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
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
