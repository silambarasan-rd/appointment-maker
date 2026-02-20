import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppointmentsRoutingModule } from './appointments-routing-module';
import { CreateAppointment } from './components/create-appointment/create-appointment';
import { EditAppointment } from './components/edit-appointment/edit-appointment';
import { ListAppointments } from './components/list-appointments/list-appointments';
import { Layout } from '../layout/layout';
import { Navbar } from '../layout/navbar/navbar';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppointmentFormComponent } from './shared/appointment-form/appointment-form';
import {
  NgxDaterangepickerBootstrapModule,
  NgxDaterangepickerBootstrapComponent,
  NgxDaterangepickerLocaleService
} from "ngx-daterangepicker-bootstrap";

@NgModule({
  declarations: [
    Layout,
    Navbar,
    CreateAppointment,
    EditAppointment,
    ListAppointments,
    AppointmentFormComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FaIconComponent,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerBootstrapModule.forRoot(),
  ],
  providers: [
    NgxDaterangepickerLocaleService
  ]
})
export class AppointmentsModule { }
