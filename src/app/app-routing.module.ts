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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro1', component: RegisterStep1Component },
  { path: 'registro2', component: RegisterStep2Component },
  { path: 'recover1', component: Recover1Component },
  { path: 'recover2', component: Recover2Component },
  { path: 'recover3', component: Recover3Component },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
