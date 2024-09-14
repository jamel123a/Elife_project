import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdatevideoComponent } from '../updatevideo/updatevideo.component';

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
      this.initForm();





    }
      initForm() {
        this.updateVideoForm = this.fb.group({
          title: [null, [Validators.required, Validators.minLength(5)]],
          description: [null, [Validators.required, Validators.minLength(10)]],
          tags: [null, [Validators.required]]
        });
      }


    getAllAttendeVideos(){
      this.adminService.getAllAttendeVideo().subscribe(res=>{
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      })
     }

     updateVideo(videoId: string) {
      const dialogRef = this.dialog.open(UpdatevideoComponent, {
        width: '400px',
        data: { videoId: videoId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllAttendeVideos(); // Refresh the video list after closing the dialog
        }
      });
    }






     deleteVideo(id: string) {
      this.adminService.deleteVideo(id).subscribe(
        res => {
          this.snackbar.open('Video deleted successfully', 'Close', {
            duration: 3000
          });
          this.getAllAttendeVideos();
        },
        err => this.snackbar.open('Failed to delete video', 'Close', {
           duration: 3000
          })
      );
    }


    changeVideoStatus(videoId: string) {
      this.adminService.changeVideoStatus(videoId, 'PUBLIC').subscribe(
        () => {
          this.snackbar.open('Video status updated to PUBLIC', 'Close', { duration: 3000 });
          this.getAllAttendeVideos(); // Refresh video list
        },

        err => this.snackbar.open('Failed to delete video', 'Close', {
          duration: 3000
         })
     );



}

}
