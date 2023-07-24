import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: LoginService, private router: Router) { }

  username!: string;
  password!: string;

  onSubmit(): void {
    this.userService.generateToken(this.username, this.password).subscribe(
      (response: any) => {
        
        this.userService.login(response.token);
        this.userService.getCurrentUser().subscribe((res: any) => {
          this.router.navigate(['dashboard']);
        });
      },
      (error: any) => {
        console.log('algùn error ', error);
      }
    );
  }
}
