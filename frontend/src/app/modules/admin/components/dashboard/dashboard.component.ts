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
  { name: 'Users', icon: 'home', route: 'users' },
  { name: 'Public Video', icon: 'person', route: 'videos/public' },
  { name: 'Attende Video', icon: 'settings', route: 'videos/attende' },
];

}
