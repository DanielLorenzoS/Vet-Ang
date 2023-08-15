import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit{
  
  title = 'veterinaria';
  isLoading: boolean = false;
  isDrawerOpen: boolean = false;
  showEmployees: boolean = false;

  constructor(
    private loadingIndicatorService: SpinnerService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loadingIndicatorService.loadingState$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  ngOnInit(): void {
    this.getRole();
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  close(rout: string): void {
    this.router.navigate(['dashboard/'+rout]);
    this.toggleDrawer();
  }

  getRole(): void {
    this.loginService.getCurrentUser().subscribe(
      (res: any) => {
        console.log(res.authorities[0].authority);
        if (res.authorities[0].authority == 'ROLE_ADMIN') {
          this.showEmployees = true;
        }
        console.log(this.showEmployees);
      }
    );
  }
}
