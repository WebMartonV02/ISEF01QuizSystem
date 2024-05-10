import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quizuebersicht',
  templateUrl: './quizuebersicht.component.html',
  styleUrls: ['./quizuebersicht.component.scss'],
})
export class QuizuebersichtComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  login() {
    this.authService.navigateToLogin();
  }
}
