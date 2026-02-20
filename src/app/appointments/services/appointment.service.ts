import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment, CreateAppointmentPayload } from '../models/appointment.model';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000';

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointment/v1/list/`).pipe(
      map(appointments => appointments.map(apt => this.normalizeAppointment(apt)))
    );
  }

  getAppointmentById(id: string): Observable<Appointment | undefined> {
    // TODO: Implement when API endpoint is available
    return of(undefined);
  }

  addAppointment(payload: CreateAppointmentPayload): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/appointment/v1/create/`, payload).pipe(
      map(appointment => this.normalizeAppointment(appointment))
    );
  }

  updateAppointment(id: string, appointment: Appointment): Observable<Appointment> {
    // TODO: Implement when API endpoint is available
    return of(appointment);
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/appointment/v1/delete/${id}/`);
  }

  private normalizeAppointment(appointment: Appointment): Appointment {
    return {
      ...appointment,
      start_time: new Date(appointment.start_time),
      end_time: new Date(appointment.end_time),
      status: appointment.status?.toLowerCase() as Appointment['status']
    };
  }
}
