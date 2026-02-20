import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Appointment, CreateAppointmentPayload, Participant, UpdateAppointmentPayload } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import {
  faClock,
  faUsers,
  faSave,
  faTimes,
  faCalendarAlt,
  faNotesMedical,
  faPlus,
  faWarning
} from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: false,
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss'
})
export class AppointmentFormComponent implements OnInit {
  @Input() isEditMode = false;
  
  appointmentForm!: FormGroup;
  allParticipants: Participant[] = [];
  selectedParticipants: Participant[] = [];
  participantInput = '';
  
  hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
  
  selectedDateRange: any;
  selectedStartDate = '';
  selectedEndDate = '';
  conflictingAppointments: Appointment[] = [];
  minDate: Dayjs = dayjs();
  currentAppointment?: Appointment;
  
  dateRangeLocale = {
    format: "DD/MM/YYYY HH:mm",
    displayFormat: 'DD/MM/YYYY hh:mm A'
  };
  
  // FontAwesome Icons
  faPlus = faPlus;
  faClock = faClock;
  faUsers = faUsers;
  faSave = faSave;
  faTimes = faTimes;
  faCalendarAlt = faCalendarAlt;
  faNotesMedical = faNotesMedical;
  faWarning = faWarning;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeParticipants();
  }

  ngOnInit(): void {
    this.createForm();
    if (this.isEditMode) {
      this.loadAppointmentForEdit();
    }
  }

  private createForm(): void {
    this.appointmentForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      notes: [''],
      dateRange: ['', Validators.required],
      startDate: [''],
      endDate: ['']
    });
  }

  onDateRangeChange(event: any): void {
    if (event && event.start && event.end) {
      const startDate = event.start.format('YYYY-MM-DD');
      const endDate = event.end.format('YYYY-MM-DD');
      
      this.appointmentForm.patchValue({
        startDate: startDate,
        endDate: endDate
      });
      
      this.selectedStartDate = event.start.format('DD/MM/YYYY');
      this.selectedEndDate = event.end.format('DD/MM/YYYY');
      
      // Trigger re-validation
      this.appointmentForm.get('endDate')?.updateValueAndValidity();
    }
  }

  private initializeParticipants(): void {
    this.allParticipants = [
      { id: 'c7860f6c-2319-447a-8f30-ff08ab9ed785', full_name: 'Silambarasan R' },
      { id: uuidv4(), full_name: 'Vijay' },
      { id: uuidv4(), full_name: 'Saju' },
      { id: uuidv4(), full_name: 'Nikhil' },
      { id: uuidv4(), full_name: 'Tanishka' },
      { id: uuidv4(), full_name: 'Parvati' },
      { id: uuidv4(), full_name: 'John' }
    ];
  }

  private loadAppointmentForEdit(): void {
    this.route.queryParams.subscribe(params => {
      const appointmentId = params['id'];
      if (appointmentId) {
        this.appointmentService.getAppointmentById(appointmentId).subscribe({
          next: (appointment) => {
            if (appointment) {
              this.patchFormWithAppointment(appointment);
            }
          },
          error: (error) => {
            console.error('Error loading appointment:', error);
          }
        });
      }
    });
  }

  private patchFormWithAppointment(appointment: Appointment): void {
    this.currentAppointment = appointment;
    const startDate = dayjs(appointment.start_time);
    const endDate = dayjs(appointment.end_time);

    this.appointmentForm.patchValue({
      id: appointment.id,
      title: appointment.title,
      notes: appointment.notes,
      dateRange: {
        start: startDate,
        end: endDate
      },
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    });

    this.selectedParticipants = appointment.participants;
    this.selectedStartDate = startDate.format('DD/MM/YYYY HH:mm');
    this.selectedEndDate = endDate.format('DD/MM/YYYY HH:mm');
    this.selectedDateRange = {
      start: startDate,
      end: endDate
    };
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatParticipants(appointment: Appointment) {
    if (appointment.participants && appointment.participants.length > 0) {
      return appointment.participants.map(p => p.full_name).join(", ");
    }

    return "";
  }

  addParticipant(): void {
    if (!this.participantInput.trim()) {
      return;
    }

    const newId = uuidv4();
    const newParticipant: Participant = {
      id: newId,
      full_name: this.participantInput.trim()
    };

    if (!this.selectedParticipants.find(p => p.id === newId)) {
      this.selectedParticipants.push(newParticipant);
      this.allParticipants.push(newParticipant);
      this.participantInput = '';
    }
  }

  removeParticipant(participantId: string): void {
    this.selectedParticipants = this.selectedParticipants.filter(p => p.id !== participantId);
  }

  selectParticipant(participant: Participant): void {
    if (!this.selectedParticipants.find(p => p.id === participant.id)) {
      this.selectedParticipants.push(participant);
    }
  }

  getAvailableParticipants(): Participant[] {
    return this.allParticipants.filter(
      p => !this.selectedParticipants.find(sp => sp.id === p.id)
    );
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid || this.selectedParticipants.length === 0) {
      alert('Please fill all required fields and select at least one participant.');
      return;
    }

    const formValue = this.appointmentForm.value;
    // Extract dates and times from the dateRange
    const startDateTime = this.selectedDateRange?.start || dayjs(formValue.startDate);
    const endDateTime = this.selectedDateRange?.end || dayjs(formValue.endDate);
    
    const startDate = dayjs(startDateTime);
    const endDate = dayjs(endDateTime);

    const payload: CreateAppointmentPayload = {
      title: formValue.title,
      description: formValue.notes || '',
      start_time: startDate.format('YYYY-MM-DDTHH:mm:ssZ'),
      end_time: endDate.format('YYYY-MM-DDTHH:mm:ssZ'),
      participants: this.selectedParticipants.map(participant => participant.full_name)
    };

    if (this.isEditMode && formValue.id && this.currentAppointment) {
      const payload: UpdateAppointmentPayload = {
        title: formValue.title,
        description: formValue.notes || '',
        start_time: startDate.format('YYYY-MM-DDTHH:mm:ssZ'),
        end_time: endDate.format('YYYY-MM-DDTHH:mm:ssZ'),
        participants: this.selectedParticipants.map(participant => participant.full_name)
      };

      this.appointmentService.updateAppointment(formValue.id, payload).subscribe({
        next: () => {
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          console.error('Error updating appointment:', error);
        }
      });
    } else {
      this.appointmentService.addAppointment(payload).subscribe({
        next: () => {
          this.router.navigate(['/appointments']);
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/appointments']);
  }
}
