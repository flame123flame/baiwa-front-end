import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ComponentsModule } from 'src/app/components/components.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalenderComponent } from './calender/calender.component';
import { NewComponent } from './new/new.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentdetailComponent } from './appointmentdetail/appointmentdetail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';



const routes: Routes = [
  { path: 'calendar', component: CalenderComponent },
  { path: 'news', component: NewComponent },
  { path: 'newsdetail', component: NewsdetailComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'appointmentdetail', component: AppointmentdetailComponent },
];

@NgModule({
  declarations: [
  CalenderComponent,
  NewComponent,
  AppointmentComponent,
  AppointmentdetailComponent,
  NewsdetailComponent
],
  imports: [
    CommonModule,    
    ComponentsModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],  
})
export class AppointmentModule { }
