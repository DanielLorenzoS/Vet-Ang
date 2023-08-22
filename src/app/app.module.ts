import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { RegisterStep1Component } from './pages/register-step1/register-step1.component';
import { RegisterStep2Component } from './pages/register-step2/register-step2.component';
import { PhonePipe } from './pipes/phone.pipe';
import { AdressPipe } from './pipes/adress.pipe';
import { Recover1Component } from './pages/recover1/recover1.component';
import { Recover2Component } from './pages/recover2/recover2.component';
import { Recover3Component } from './pages/recover3/recover3.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewClientComponent } from './pages/client/new-client/new-client.component';
import { AllClientsComponent } from './pages/client/all-clients/all-clients.component';
import { IndividualClientComponent } from './pages/client/individual-client/individual-client.component';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { AddPetComponent } from './pages/pet/add-pet/add-pet.component';
import { PetComponent } from './pages/pet/pet/pet.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AllPetsComponent } from './pages/pet/all-pets/all-pets.component';
import { AllAppointmentComponent } from './pages/appointment/all-appointment/all-appointment.component';
import { AppointmentComponent } from './pages/appointment/appointment/appointment.component';
import { AddAppointmentComponent } from './pages/appointment/add-appointment/add-appointment.component';
import { MedicalComponent } from './pages/pet/medical/medical/medical.component';
import { AddMedicalComponent } from './pages/pet/medical/add-medical/add-medical.component';
import { AddPrescriptionComponent } from './pages/pet/medical/add-prescription/add-prescription.component';
import { PrescriptionComponent } from './pages/pet/medical/prescription/prescription.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterPipe } from './pipes/filter.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EmployeesComponent } from './pages/employee/employees/employees.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditAppointmentComponent } from './pages/appointment/edit-appointment/edit-appointment.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterStep1Component,
    RegisterStep2Component,
    PhonePipe,
    AdressPipe,
    Recover1Component,
    Recover2Component,
    Recover3Component,
    NavbarComponent,
    NewClientComponent,
    AllClientsComponent,
    IndividualClientComponent,
    AddPetComponent,
    PetComponent,
    GraphicsComponent,
    AllPetsComponent,
    AllAppointmentComponent,
    AppointmentComponent,
    AddAppointmentComponent,
    MedicalComponent,
    AddMedicalComponent,
    AddPrescriptionComponent,
    PrescriptionComponent,
    FilterPipe,
    EmployeesComponent,
    EditAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    NgxChartsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    TranslateModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatDialogModule
  ],
  providers: [authInterceptorProviders, CookieService, DatePipe, {provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
