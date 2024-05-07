import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fragenedit',
  templateUrl: './fragenedit.component.html',
  styleUrls: ['./fragenedit.component.scss'],
})
export class FrageneditComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.navigateToLogin();
  }
}
