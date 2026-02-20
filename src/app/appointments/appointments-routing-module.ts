import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAppointments } from './components/list-appointments/list-appointments';
import { CreateAppointment } from './components/create-appointment/create-appointment';
import { EditAppointment } from './components/edit-appointment/edit-appointment';
import { Layout } from '../layout/layout';

const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "",
        component: ListAppointments
      },
      {
        path: "create",
        component: CreateAppointment
      },
      {
        path: "edit",
        component: EditAppointment
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
