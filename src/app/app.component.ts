import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veterinaria';
  isLoading: boolean = false;

  constructor(private loadingIndicatorService: SpinnerService) {
    this.loadingIndicatorService.loadingState$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
