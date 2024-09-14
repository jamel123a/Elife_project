import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadvideoComponent } from './components/dashboard/uploadvideo/uploadvideo.component';

const routes: Routes = [
  {path :"dashboard", component :DashboardComponent,
    children: [
      {path : 'dashboard/video/upload', component: UploadvideoComponent}
    ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {


 }
