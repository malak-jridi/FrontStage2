import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupTutorComponent } from './pages/signup-tutor/signup-tutor.component';
import { TutorsComponent } from './pages/tutors/tutors.component';
import { TutorProfileComponent } from './pages/tutor-profile/tutor-profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MyRequestsComponent } from './pages/myRequests/myRequests.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TeacherComponent } from './admin/teacher/teacher.component';
import { BookingListComponent } from './admin/booking-list/booking-list.component';
import { TransactionListComponent } from './admin/transaction-list/transaction-list.component';
import { AuthGuard } from './components/auth/auth.guard';
import { VideoCallComponent } from './pages/talk/video-call/video-call.component';
import { AdminGuard } from './components/auth/admin.guard';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-tutor', component: SignupTutorComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tutors', canActivate: [AuthGuard], component: TutorsComponent },
  { path: 'myRequests', component: MyRequestsComponent },

  { path: 'tutor/:id', component: TutorProfileComponent },
  { path: 'settings', component: SettingsComponent },

  { path: 'videoCall/:id', component: VideoCallComponent },

  { path: 'admin', canActivate: [AdminGuard], component: DashboardComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/teacher',
    canActivate: [AdminGuard],
    component: TeacherComponent,
  },
  {
    path: 'admin/booking',
    canActivate: [AdminGuard],
    component: BookingListComponent,
  },
  {
    path: 'admin/booking/transaction',
    canActivate: [AdminGuard],
    component: TransactionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
