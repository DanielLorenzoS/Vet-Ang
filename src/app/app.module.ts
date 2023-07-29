import { NgModule } from '@angular/core';
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
    IndividualClientComponent
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
    MatPaginatorModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
