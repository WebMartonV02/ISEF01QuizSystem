import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kursauswahl',
  templateUrl: './fragenseite.component.html',
  styleUrls: ['./fragenseite.component.scss'],
})
export class FragenseiteComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.navigateToLogin();
  }
}
