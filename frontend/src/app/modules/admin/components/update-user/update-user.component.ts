import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements  OnInit {
  updateUserForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUser();
  }

  initForm() {
    this.updateUserForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]]
    });
  }

  getUser() {
    this.adminService.getUser(this.data.userId).subscribe(res => {
      this.updateUserForm.patchValue({
        username: res.username,
        email: res.email,
        role: res.role
      });
      console.log(this.updateUserForm)
    });
  }


  onSubmit() {
    const updatedUser = {
      username: this.updateUserForm.get('username')?.value,
      email: this.updateUserForm.get('email')?.value,
      role: this.updateUserForm.get('role')?.value
    };



    this.adminService.updateUser(this.data.userId, updatedUser).subscribe(res => {
      this.snackbar.open('User updated successfully', 'Close', {
        duration: 5000
      });
      this.dialogRef.close(true);
    }, err => {
      this.snackbar.open('Failed to update user. Please try again.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

