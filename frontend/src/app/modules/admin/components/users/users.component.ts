import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';

declare var bootstrap: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  updateUserForm!: FormGroup;
  addUserForm!: FormGroup;
  hidePassword = true;
  userId!: number;



  displayedColumns: string[] = ['id',
    'username',
     'email',
     'role',
    'actions' ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,


  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.addUserForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      role: [null, [Validators.required]]

    });
  }



  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }


   getUsers(){
    this.adminService.getUsers().subscribe(res=>{
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    })
   }


   /// ad user
   onSubmit() {
    const password = this.addUserForm.get('password')?.value;
    const confirmPassword = this.addUserForm.get('confirmPassword')?.value;


    if (password !== confirmPassword) {
      this.snackbar.open('Passwords do not match', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      return;
    }

    const newUser = {
      username: this.addUserForm.get('username')?.value,
      email: this.addUserForm.get('email')?.value,
      password: password,
      role: this.addUserForm.get('role')?.value

    };

    this.adminService.addUser(newUser).pipe(
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
        this.snackbar.open('User added successfully', 'Close', {
          duration: 5000
        });
        this.getUsers();
        this.addUserForm.reset();
      } else {
        this.snackbar.open('Failed to add user. Please try again.', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  }


/// update
updateUser(userId: number) {
  const dialogRef = this.dialog.open(UpdateUserComponent, {
    width: '400px',
    data: { userId: userId }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.getUsers(); // Refresh the user list after closing the dialog
    }
  });
}


/// delete
  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(
      res => {
        this.snackbar.open('User deleted successfully', 'Close', {
          duration: 5000
        });
        this.getUsers();
      },
      err => {
        this.snackbar.open('Error deleting user', 'Close', {
          duration: 5000
        });
      }
    );
  }




}
