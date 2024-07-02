import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attende-video',
  templateUrl: './attende-video.component.html',
  styleUrls: ['./attende-video.component.css']
})
export class AttendeVideoComponent implements OnInit {





  updateVideoForm!: FormGroup;
  userId!: number;


  displayedColumns: string[] = [
    'id',
    'title',
     'description',
     'tags',
     'userId',
     'views',
    'actions'];


   dataSource = new MatTableDataSource<any>();
   @ViewChild(MatPaginator) paginator: MatPaginator;



   @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
     separatorKeysCodes: readonly number[]|ReadonlySet<number>;



    constructor(
      private adminService: AdminService,
      private fb: FormBuilder,
      private snackbar: MatSnackBar,
      public router: Router,
      private route: ActivatedRoute,
      private dialog: MatDialog,

     ){}



    ngOnInit(): void {
      this.getAllAttendeVideos();



        this.updateVideoForm = this.fb.group({
          id: [null, [Validators.required]],
          title: [null, [Validators.required, Validators.maxLength(20)]],
          description: [null, [Validators.required, Validators.maxLength(50)]],
          tags: [null, [Validators.required]],
        });


    }


    getAllAttendeVideos(){
      this.adminService.getAllAttendeVideo().subscribe(res=>{
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      })
     }


}
