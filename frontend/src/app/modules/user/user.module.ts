import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadvideoComponent } from './components/dashboard/uploadvideo/uploadvideo.component';
import { DemoAngularMaterielModule } from 'src/app/DemoAngularMaterielModule';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UploadvideoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DemoAngularMaterielModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
