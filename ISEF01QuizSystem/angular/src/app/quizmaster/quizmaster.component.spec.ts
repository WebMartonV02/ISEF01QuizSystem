import { CoreTestingModule } from "@abp/ng.core/testing";
import { ThemeSharedTestingModule } from "@abp/ng.theme.shared/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgxValidateCoreModule } from "@ngx-validate/core";
import { QuizmasterComponent } from "./quizmaster.component";
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '@abp/ng.core';



describe("QuizmasterComponent", () => {
  let fixture: ComponentFixture<QuizmasterComponent>;
  const mockOAuthService = jasmine.createSpyObj('OAuthService', ['hasValidAccessToken'])
  const mockAuthService = jasmine.createSpyObj('AuthService', ['navigateToLogin'])
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuizmasterComponent],
        imports: [
          CoreTestingModule.withConfig(),
          ThemeSharedTestingModule.withConfig(),
          NgxValidateCoreModule,
        ],
        providers: [
          /* mock providers here */
          {
            provide: OAuthService,
            useValue: mockOAuthService
          },
          {
            provide: AuthService,
            useValue: mockAuthService
          }
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizmasterComponent);
    fixture.detectChanges();
  });

  it("should be initiated", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });



  describe('when login state is true', () => {
    beforeAll(() => {
      mockOAuthService.hasValidAccessToken.and.returnValue(true)
    });

    it("hasLoggedIn should be true", () => {

      expect(mockOAuthService.hasValidAccessToken).toHaveBeenCalled()
    })

    it("button should not be exists", () => {
      const element = fixture.nativeElement
      const button = element.querySelector('[role="button"]')
      expect(button).toBeNull()
    })

  })

  describe('when login state is false', () => {
    beforeAll(() => {
      mockOAuthService.hasValidAccessToken.and.returnValue(false)
    });

    it("hasLoggedIn should be false", () => {

      expect(mockOAuthService.hasValidAccessToken).toHaveBeenCalled()
    })

    it("button should be exists", () => {
      const element = fixture.nativeElement
      const button = element.querySelector('[role="button"]')
      expect(button).toBeDefined()
    })
    describe('when button clicked', () => {

      beforeEach(() => {
        const element = fixture.nativeElement
        const button = element.querySelector('[role="button"]')
        button.click()
      });

      it("navigateToLogin have been called", () => {
        expect(mockAuthService.navigateToLogin).toHaveBeenCalled()
      })
    })
  })

});
