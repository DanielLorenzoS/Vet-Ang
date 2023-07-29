import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showNavbar!: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dashboard: DashboardComponent
  ) { }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  toggleSideBar() {
    this.dashboard.isDrawerOpen = !this.dashboard.isDrawerOpen;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
