import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showNavbar: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dashboard: DashboardComponent,
    private cookieService: CookieService
  ) { }

  toggleSideBar() {
    this.dashboard.isDrawerOpen = !this.dashboard.isDrawerOpen;
    this.showNavbar = !this.showNavbar;
  }

  logout() {
    this.loginService.logout2().subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('logged', 'false');
        this.cookieService.deleteAll();
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.router.navigate(['/']);
  }
}
