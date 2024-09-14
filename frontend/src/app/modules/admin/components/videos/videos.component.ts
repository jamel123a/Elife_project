import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatChipInputEvent } from '@angular/material/chips';
import { UpdatevideoComponent } from '../updatevideo/updatevideo.component';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit{


  updateVideoForm!: FormGroup;
  addVideoForm!: FormGroup;
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
    this.getAllPublicVideos();

      this.addVideoForm = this.fb.group({
        file: [null, [Validators.required]],
        title: [null, [Validators.required, Validators.minLength(20)]],
        description: [null, [Validators.required,  Validators.minLength(40)]],
        tags: [null, [Validators.required]],});


      this.updateVideoForm = this.fb.group({
        id: [null, [Validators.required]],
        title: [null, [Validators.required, Validators.maxLength(20)]],
        description: [null, [Validators.required, Validators.maxLength(50)]],
        tags: [null, [Validators.required]],
      });


  }
  getAllPublicVideos(){
      this.adminService.getAllPublicVideo().subscribe(res=>{
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      })
     }


     addVideo() {
      if (this.addVideoForm.invalid) return;
      const formData = new FormData();
      formData.append('file', this.addVideoForm.get('file')?.value);
      formData.append('title', this.addVideoForm.get('title')?.value);
      formData.append('description', this.addVideoForm.get('description')?.value);
      formData.append('tags', this.addVideoForm.get('tags')?.value); // Convert tags array to string
      this.adminService.addVideo(formData).subscribe(
        res => {
          this.snackbar.open('Video added successfully', 'Close', { duration: 3000 });
          this.getAllPublicVideos();
        },
        err => this.snackbar.open('Failed to add video', 'Close', { duration: 3000 })
      );
    }



    updateVideo(videoId: string) {
      const dialogRef = this.dialog.open(UpdatevideoComponent, {
        width: '400px',
        data: { videoId: videoId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllPublicVideos(); // Refresh the video list after closing the dialog
        }
      });
    }




     onFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.addVideoForm.patchValue({
          file: input.files[0]
        });
      }
    }





     deleteVideo(id: string) {
      this.adminService.deleteVideo(id).subscribe(
        res => {
          this.snackbar.open('Video deleted successfully', 'Close', {
            duration: 3000
          });
          this.getAllPublicVideos();
        },
        err => this.snackbar.open('Failed to delete video', 'Close', {
           duration: 3000
          })
      );
    }



    // Method to add tags to form control
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add tag only when it's not empty
    if (value) {
      const tags = this.addVideoForm.get('tags')?.value as string[];
      tags.push(value);
      this.addVideoForm.get('tags')?.setValue(tags);
      event.chipInput!.clear(); // Clear the input
    }
  }

  // Method to remove tags from form control
  removeTag(tag: string): void {
    const tags = this.addVideoForm.get('tags')?.value as string[];
    const index = tags.indexOf(tag);
    if (index >= 0) {
      tags.splice(index, 1);
      this.addVideoForm.get('tags')?.setValue(tags);
    }
  }






}
