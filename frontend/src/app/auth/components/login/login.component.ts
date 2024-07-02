import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   loginForm! : FormGroup;
   hidePassword = true;
   constructor(private fb : FormBuilder,
    private authService : AuthService,
    private snackbar : MatSnackBar,
    private router : Router

   ){
    this.loginForm = this.fb.group({
      email : [null,[Validators.required, Validators.email]],
      password :[null,[Validators.required]],
    })


   }
   togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }
  onSubmit(){
    this.authService.login(this.loginForm.value).pipe(
      catchError((error) => {
        this.snackbar.open("Incorrect username or password", 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        return throwError(error);
      })

    ).subscribe((res)=>{
    if(res.userId !=null){
        const user ={
          id : res.id,
          role : res.role
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt)
        if (StorageService.isAdminLogged())
          this.router.navigateByUrl("/admin/dashboard");
        else if(StorageService.isUserLogged())
          this.router.navigateByUrl("/user/dashboard")
        this.snackbar.open("login succesful", "Close",{duration :5000});

      }else{
        this.snackbar.open("Incorrect username or password","Close",{duration :5000,panelClass:"error-snackbar"});
      }
    })

   }
}
