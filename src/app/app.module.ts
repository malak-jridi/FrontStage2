import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupStepComponent } from './components/signup-step/signup-step.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { SignupTutorComponent } from './pages/signup-tutor/signup-tutor.component';
import { TutorsComponent } from './pages/tutors/tutors.component';
import { TutorCardItemComponent } from './components/tutor-card-item/tutor-card-item.component';
import { BookingCardItemComponent } from './components/booking-card-item/booking-card-item.component';
import { MyRequestsComponent } from './pages/myRequests/myRequests.component';

import { IconWebComponent } from './components/icons/icon-web/icon-web.component';
import { TutorProfileComponent } from './pages/tutor-profile/tutor-profile.component';
import { IconStudySubjectComponent } from './components/icons/icon-study-subject/icon-study-subject.component';
import { IconShieldCheckComponent } from './components/icons/icon-shield-check/icon-shield-check.component';
import { IconCommentComponent } from './components/icons/icon-comment/icon-comment.component';
import { IconAimComponent } from './components/icons/icon-aim/icon-aim.component';
import { IconLightningComponent } from './components/icons/icon-lightning/icon-lightning.component';
import { IconOutlineQuestionComponent } from './components/icons/icon-outline-question/icon-outline-question.component';
import { IconRatingStarComponent } from './components/icons/icon-rating-star/icon-rating-star.component';
import { IconTrendComponent } from './components/icons/icon-trend/icon-trend.component';
import { IconResponseComponent } from './components/icons/icon-response/icon-response.component';
import { ButtonComponent } from './components/button/button.component';
import { IconLightningSingleComponent } from './components/icons/icon-lightning-single/icon-lightning-single.component';
import { IconMessageComponent } from './components/icons/icon-message/icon-message.component';
import { IconOutlineFavoriteComponent } from './components/icons/icon-outline-favorite/icon-outline-favorite.component';
import { IconOutlineMessageComponent } from './components/icons/icon-outline-message/icon-outline-message.component';
import { IconStarBadgeComponent } from './components/icons/icon-star-badge/icon-star-badge.component';
import { IconCheckMarkComponent } from './components/icons/icon-check-mark/icon-check-mark.component';
import { TutorResumeComponent } from './components/tutor-profile/tutor-resume/tutor-resume.component';
import { TutorAboutComponent } from './components/tutor-profile/tutor-about/tutor-about.component';
import { TutorScheduleComponent } from './components/tutor-profile/tutor-schedule/tutor-schedule.component';
import { TutorSidePanelComponent } from './components/tutor-profile/tutor-side-panel/tutor-side-panel.component';
import { TutorSubjectsComponent } from './components/tutor-profile/tutor-subjects/tutor-subjects.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VdoPlayerComponent } from './components/vdo-player/vdo-player.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { SettingsNavComponent } from './components/settings/settings-nav/settings-nav.component';
import { SettingsAccountComponent } from './components/settings/settings-account/settings-account.component';
import { SettingsPasswordComponent } from './components/settings/settings-password/settings-password.component';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AdminModule } from './admin/admin.module';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { VideoCallComponent } from './pages/talk/video-call/video-call.component';
import { VideoChatComponent } from './pages/talk/video-chat/video-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    SignupComponent,
    SignupTutorComponent,
    SignupStepComponent,
    FileUploadComponent,
    ImageUploadComponent,
    TutorsComponent,
    TutorCardItemComponent,
    MyRequestsComponent,
    BookingCardItemComponent,
    IconWebComponent,
    TutorProfileComponent,
    IconStudySubjectComponent,
    IconShieldCheckComponent,
    IconCommentComponent,
    IconAimComponent,
    IconLightningComponent,
    IconOutlineQuestionComponent,
    IconRatingStarComponent,
    IconTrendComponent,
    IconResponseComponent,
    ButtonComponent,
    IconLightningSingleComponent,
    IconMessageComponent,
    IconOutlineFavoriteComponent,
    IconOutlineMessageComponent,
    IconStarBadgeComponent,
    IconCheckMarkComponent,
    TutorResumeComponent,
    TutorAboutComponent,
    TutorScheduleComponent,
    TutorSidePanelComponent,
    TutorSubjectsComponent,
    SettingsComponent,
    VdoPlayerComponent,
    ReadMoreComponent,
    SettingsNavComponent,
    SettingsAccountComponent,
    SettingsPasswordComponent,

    PopupComponent,
      SideBarComponent,
      HeaderAdminComponent,
      VideoCallComponent,
      VideoChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    jqxGridModule,
    jqxSchedulerModule,

    BrowserAnimationsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatNativeDateModule ,
    MatIconModule,
    MatTooltipModule,
    AdminModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
