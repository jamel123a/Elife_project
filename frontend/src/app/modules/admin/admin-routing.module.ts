import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { VideosComponent } from './components/videos/videos.component';
import { AttendeVideoComponent } from './components/attende-video/attende-video.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
{path:"dashboard" ,component :DashboardComponent,
children: [
  { path: 'users', component: UsersComponent },
  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'videos/public', component: VideosComponent },
  { path: 'videos/attende', component: AttendeVideoComponent },
]
},
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
