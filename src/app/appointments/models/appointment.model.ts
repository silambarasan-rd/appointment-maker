export interface Participant {
  id: string;
  full_name: string;
}

export interface Appointment {
  id: string;
  title: string;
  notes?: string;
  start_time: Date;
  end_time: Date;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  is_conflict: boolean;
  message: string;
  participants: Participant[];
}

export interface CreateAppointmentPayload {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  participants: string[];
}

export type AppointmentStatus = Appointment['status'];
