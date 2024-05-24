import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fragemanager',
  templateUrl: './fragemanager.component.html',
  styleUrls: ['./fragemanager.component.scss'],
})
export class FragemanagerComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.navigateToLogin();
  }
}
