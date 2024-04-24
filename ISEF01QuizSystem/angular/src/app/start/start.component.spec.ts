import { CoreTestingModule } from "@abp/ng.core/testing";
import { ThemeSharedTestingModule } from "@abp/ng.theme.shared/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgxValidateCoreModule } from "@ngx-validate/core";
import { StartComponent } from "./start.component";
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '@abp/ng.core';



describe("StartComponent", () => {
  let fixture: ComponentFixture<StartComponent>;
  const mockOAuthService = jasmine.createSpyObj('OAuthService', ['hasValidAccessToken'])
  const mockAuthService = jasmine.createSpyObj('AuthService', ['navigateToLogin'])
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StartComponent],
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
    fixture = TestBed.createComponent(StartComponent);
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

      expect(fixture.componentInstance.hasLoggedIn).toBeTrue();
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

      expect(fixture.componentInstance.hasLoggedIn).toBeFalse();
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
