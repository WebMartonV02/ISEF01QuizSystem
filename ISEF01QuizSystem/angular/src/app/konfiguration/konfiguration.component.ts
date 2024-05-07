import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-konfiguration',
  templateUrl: './konfiguration.component.html',
  styleUrls: ['./konfiguration.component.scss'],
})
export class KonfigurationComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.navigateToLogin();
  }
}
