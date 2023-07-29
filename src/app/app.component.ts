import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veterinaria';
  isLoading: boolean = false;
  isDrawerOpen!: boolean;

  constructor(
    private loadingIndicatorService: SpinnerService,
    private router: Router
  ) {
    this.loadingIndicatorService.loadingState$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  
  close(rout: string): void {
    this.router.navigate([rout]);
    /* this.interfazService.toggleDrawer(); */
  }
}
