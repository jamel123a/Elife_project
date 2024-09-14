import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { authAdminGuard } from './modules/admin/guard/auth-admin.guard';
import { authUserGuard } from './modules/user/guard/auth-user.guard';
import { VideoDetailsComponent } from './public/video-details/video-details.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path :"login", component : LoginComponent},
  {path : "signup" , component : SignupComponent },
  {path: 'videos/:videoId', component: VideoDetailsComponent },
  {path : "admin", loadChildren:()=> import("./modules/admin/admin.module").then(e=> e.AdminModule), canActivate: [authAdminGuard]},
  {path : "user", loadChildren:()=> import("./modules/user/user.module").then(e=>e.UserModule),canActivate: [authUserGuard]},
  { path: '**', pathMatch: 'full',
    component: NotfoundpageComponent }, ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

