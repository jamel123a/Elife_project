import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoAngularMaterielModule } from 'src/app/DemoAngularMaterielModule';
import { UsersComponent } from './components/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VideosComponent } from './components/videos/videos.component';
import { UpdatevideoComponent } from './components/updatevideo/updatevideo.component';
import { AttendeVideoComponent } from './components/attende-video/attende-video.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    VideosComponent,
    UpdatevideoComponent,
    AttendeVideoComponent,
    UpdateUserComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoAngularMaterielModule,
    ReactiveFormsModule,




  ],
  exports: [
    DashboardComponent // Export DashboardComponent here
  ]





})
export class AdminModule { }
