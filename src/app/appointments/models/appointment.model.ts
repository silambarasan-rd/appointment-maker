export interface Participant {
  id: number;
  name: string;
}

export interface Appointment {
  id: string;
  title: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  participants: Participant[];
}

export type AppointmentStatus = Appointment['status'];
