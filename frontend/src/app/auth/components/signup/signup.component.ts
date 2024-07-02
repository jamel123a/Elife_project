import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;
  hidePassword = true;
  constructor(private fb : FormBuilder,
    private authService : AuthService,
    private snackbar : MatSnackBar,
    private router : Router
   ){
   this.signupForm = this.fb.group({
     username :[null,[Validators.required,Validators.minLength(5)]],
     email : [null,[Validators.required, Validators.email]],
     password :[null,[Validators.required,Validators.minLength(8)]],
     confirmPassword:[null,[Validators.required]]
   })
  }

   togglePasswordVisibility(){
     this.hidePassword=!this.hidePassword;
   }
   onSubmit() {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.snackbar.open('Passwords do not match', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      return;
    }

    this.authService.signup(this.signupForm.value).pipe(
      catchError((error) => {
        let errorMsg = error.error;

        this.snackbar.open(errorMsg, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        return throwError(error);
      })
    ).subscribe((res) => {
      if (res.id != null) {
        this.snackbar.open('Signup successful', 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl('/login');
      } else {
        this.snackbar.open('Signup failed. Please try again.', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }

}
