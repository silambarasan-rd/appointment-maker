import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsRoutingModule } from './appointments-routing-module';
import { CreateAppointment } from './components/create-appointment/create-appointment';
import { EditAppointment } from './components/edit-appointment/edit-appointment';
import { ListAppointments } from './components/list-appointments/list-appointments';
import { Layout } from '../layout/layout';
import { Navbar } from '../layout/navbar/navbar';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    Layout,
    Navbar,
    CreateAppointment,
    EditAppointment,
    ListAppointments
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    FaIconComponent
]
})
export class AppointmentsModule { }
