import { Routes } from '@angular/router';
import { AppointmentsModule } from './appointments/appointments-module';

export const routes: Routes = [
  {
    path: "appointments",
    loadChildren: () => import('./appointments/appointments-module').then(mod => mod.AppointmentsModule)
  },
  {
    path: "**",
    redirectTo: "/appointments"
  }
];
