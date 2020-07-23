import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { Constants } from './common/constants';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { SocialLoginService } from './services/social-login.service';
import { JwtService } from './services/jwt.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { getAuthServiceConfigs } from '../environments/environment';
import { MessagingService } from './services/messaging.service';
import { CustomDirective } from './directives/custom.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateService } from './lang/translate.service';
import { ToastrModule } from 'ngx-toastr';
import { LightboxModule } from 'ngx-lightbox';
import { LoginComponent } from './external/login/login.component';
import { RegisterComponent } from './external/register/register.component';
import { ForgotPasswordComponent } from './external/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './external/verify-otp/verify-otp.component';
import { PageNotFoundComponent } from './external/page-not-found/page-not-found.component';
import { DashboardComponent } from './internal/dashboard/dashboard.component';
import { ProjectsComponent } from './internal/projects/projects.component';
import { TasksComponent } from './internal/tasks/tasks.component';
import { IssuesComponent } from './internal/issues/issues.component';
import { IssueViewComponent } from './internal/issues/issue-view/issue-view.component';
import { TaskViewComponent } from './internal/tasks/task-view/task-view.component';
import { InternalComponent } from './internal/internal.component';
import { SocialLoginComponent } from './shared/social-login/social-login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TestingComponent } from './testing/testing.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ProjectsComponent,
    TasksComponent,
    TaskViewComponent,
    IssuesComponent,
    IssueViewComponent,
    InternalComponent,
    SocialLoginComponent,
    TestingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    Ng2TelInputModule,
    LazyLoadImageModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularMultiSelectModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    Constants, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    SocialLoginService,
    MessagingService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtService,
      multi: true
    },
    TranslateService,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }