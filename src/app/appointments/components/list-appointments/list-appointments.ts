import { Component, OnInit, signal } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';

import { faPencil, faTrash, faPlus, faCalendarDays, faClock, faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: false,
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.html',
  styleUrl: './list-appointments.scss',
})
export class ListAppointments implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;
  faPlus = faPlus
  faCalendarDate = faCalendarDays
  faClock = faClock
  faPerson = faUserAlt

  appointments = signal<Appointment[]>([]);

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (appointments) => {
        // Normalize status to lowercase to match our TypeScript model
        const normalizedAppointments = appointments.map(apt => ({
          ...apt,
          status: apt.status.toLowerCase() as any
        }));
        this.appointments.set(normalizedAppointments);
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'bg-dark';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      case 'in-progress':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  deleteAppointment(id: string): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          this.loadAppointments();
        },
        error: (error) => {
          console.error('Error deleting appointment:', error);
        }
      });
    }
  }

  getFormattedDate(date: Date): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getTimeRange(startDate: Date, endDate: Date): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startTime = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    const endTime = end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    const duration = this.calculateDuration(start, end);
    
    return `${startTime} - ${endTime} (${duration})`;
  }

  calculateDuration(startDate: Date, endDate: Date): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min`;
    }
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    
    if (mins === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    
    return `${hours}h ${mins}m`;
  }
}
