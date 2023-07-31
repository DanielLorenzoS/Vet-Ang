import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  title = 'veterinaria';
  isLoading: boolean = false;
  isDrawerOpen: boolean = true;

  constructor(
    private loadingIndicatorService: SpinnerService,
    private router: Router
  ) {
    this.loadingIndicatorService.loadingState$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  close(rout: string): void {
    this.router.navigate(['dashboard/'+rout]);
    this.toggleDrawer();
  }
}
