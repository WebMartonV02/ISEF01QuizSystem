import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kursauswahl',
  templateUrl: './kursauswahl.component.html',
  styleUrls: ['./kursauswahl.component.scss'],
})
export class KursauswahlComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.navigateToLogin();
  }
}
