import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatevideo',
  templateUrl: './updatevideo.component.html',
  styleUrls: ['./updatevideo.component.css']
})
export class UpdatevideoComponent implements OnInit {
  updateVideoForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdatevideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { videoId: string }


  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getVideo();
  }

  initForm() {
    this.updateVideoForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(5)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      tags: [null, [Validators.required]],
  //    videoStatus: [null, [Validators.required]]

    });
  }

  getVideo() {
    this.adminService.getVideo(this.data.videoId).subscribe(res => {
      this.updateVideoForm.patchValue({
        title: res.title,
        description: res.description,
        tags: res.tags,
     //   videoStatus: res.videoStatus
      });
      console.log(this.updateVideoForm)

    });
  }

  onSubmit() {

    const tagsValue = this.updateVideoForm.get('tags')?.value;

  // Ensure tagsValue is a string before splitting
  const tagsArray = typeof tagsValue === 'string' ? tagsValue.split(',') : [];


    const updatedVideo = {
      title: this.updateVideoForm.get('title')?.value,
      description: this.updateVideoForm.get('description')?.value,
     // videoStatus: this.updateVideoForm.get('videoStatus')?.value,
      tags: tagsArray, // Use the split tags array,

    };

    this.adminService.updateVideo(this.data.videoId, updatedVideo).subscribe(res => {
      this.snackbar.open('Video updated successfully', 'Close', {
        duration: 5000
      });
      this.dialogRef.close(true);
    }, err => {
      this.snackbar.open('Failed to update video. Please try again.', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
