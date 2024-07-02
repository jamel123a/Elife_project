import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path :"login", component : LoginComponent},
  {path : "signup" , component : SignupComponent },
  {path : "admin", loadChildren:()=> import("./modules/admin/admin.module").then(e=> e.AdminModule), canActivate: [AuthGuard]},
  {path : "user", loadChildren:()=> import("./modules/user/user.module").then(e=>e.UserModule),canActivate: [AuthGuard]},
  { path: '', redirectTo: '/', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

