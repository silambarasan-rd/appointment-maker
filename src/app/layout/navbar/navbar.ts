import { Component } from '@angular/core';
import { faHouse, faCalendarDays, faCircleInfo, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  faHouse = faHouse;
  faCalendarDays = faCalendarDays;
  faCircleInfo = faCircleInfo;
  faEnvelope = faEnvelope;
}
