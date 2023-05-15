import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherComponent } from './teacher/teacher.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    TeacherComponent,
    BookingListComponent,
    TransactionListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
