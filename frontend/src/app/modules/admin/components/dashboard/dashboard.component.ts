import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
menuItems = [
  { name: 'Home', icon: 'home', route: 'users' },
  { name: 'Profile', icon: 'person', route: 'videos/public' },
  { name: 'Settings', icon: 'settings', route: 'videos/attende' },
];

}
