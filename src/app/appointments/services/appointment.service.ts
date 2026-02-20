import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment.model';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000';

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointment/v1/list`).pipe(
      map(appointments => appointments.map(apt => ({
        ...apt,
        start_time: new Date(apt.start_time),
        end_time: new Date(apt.end_time)
      })))
    );
  }

  getAppointmentById(id: string): Observable<Appointment | undefined> {
    // TODO: Implement when API endpoint is available
    return of(undefined);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    // TODO: Implement when API endpoint is available
    return of(appointment);
  }

  updateAppointment(id: string, appointment: Appointment): Observable<Appointment> {
    // TODO: Implement when API endpoint is available
    return of(appointment);
  }

  deleteAppointment(id: string): Observable<void> {
    // TODO: Implement when API endpoint is available
    return of(undefined);
  }
}
