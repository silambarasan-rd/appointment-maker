import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: Appointment[] = [
    {
      id: '1',
      title: 'Team Meeting',
      notes: 'Discuss Q1 project milestones and deliverables',
      startDate: new Date(2026, 1, 21, 10, 0),
      endDate: new Date(2026, 1, 21, 11, 0),
      status: 'scheduled',
      participants: [
        { id: 1, name: 'Silambarasan R' },
        { id: 4, name: 'Nikhil' },
        { id: 2, name: 'Vijay' }
      ]
    },
    {
      id: '2',
      title: 'Doctor Appointment',
      notes: 'Annual checkup with Dr. Smith',
      startDate: new Date(2026, 1, 22, 14, 30),
      endDate: new Date(2026, 1, 22, 15, 30),
      status: 'scheduled',
      participants: [
        { id: 5, name: 'Tanishka' }
      ]
    },
    {
      id: '3',
      title: 'Client Presentation',
      notes: 'Present final design mockups to client',
      startDate: new Date(2026, 1, 20, 9, 0),
      endDate: new Date(2026, 1, 20, 10, 30),
      status: 'completed',
      participants: [
        { id: 1, name: 'Silambarasan R' },
        { id: 3, name: 'Saju' },
        { id: 6, name: 'Parvati' }
      ]
    },
    {
      id: '4',
      title: 'Lunch with Sarah',
      notes: 'Catch up at the new Italian restaurant downtown',
      startDate: new Date(2026, 1, 23, 12, 0),
      endDate: new Date(2026, 1, 23, 13, 0),
      status: 'scheduled',
      participants: [
        { id: 3, name: 'Saju' }
      ]
    },
    {
      id: '5',
      title: 'Dentist Appointment',
      notes: 'Teeth cleaning',
      startDate: new Date(2026, 1, 19, 16, 0),
      endDate: new Date(2026, 1, 19, 17, 0),
      status: 'cancelled',
      participants: [
        { id: 7, name: 'John' }
      ]
    }
  ];

  getAppointments(): Observable<Appointment[]> {
    return of(this.appointments);
  }

  deleteAppointment(id: string): Observable<void> {
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments.splice(index, 1);
    }
    return of(undefined);
  }
}
