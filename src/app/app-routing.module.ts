import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './external/login/login.component';
import { ForgotPasswordComponent } from './external/forgot-password/forgot-password.component';

import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './external/register/register.component';
import { VerifyOtpComponent } from './external/verify-otp/verify-otp.component';
import { InternalComponent } from './internal/internal.component';
import { DashboardComponent } from './internal/dashboard/dashboard.component';
import { PageNotFoundComponent } from './external/page-not-found/page-not-found.component';
import { ProjectsComponent } from './internal/projects/projects.component';
import { IssuesComponent } from './internal/issues/issues.component';
import { TasksComponent } from './internal/tasks/tasks.component';
import { TestingComponent } from './testing/testing.component';


export const routes:Routes=[ 
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'verify-otp', component: VerifyOtpComponent},
  {path:'forgot-password', component: ForgotPasswordComponent },
  {path:'testing', component: TestingComponent }, 
  {path:'internal', component: InternalComponent,canActivate:[AuthGuard],
    children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'projects', component: ProjectsComponent},
        {path: 'tasks', component: TasksComponent},
        {path: 'issues', component: IssuesComponent},
        // {path: 'dashboard', component: DashboardComponent},
      ],
  },
  {path: '404', component: PageNotFoundComponent },

]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {



 }
