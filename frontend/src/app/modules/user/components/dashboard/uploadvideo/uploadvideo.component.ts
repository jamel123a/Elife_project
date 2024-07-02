import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-uploadvideo',
  templateUrl: './uploadvideo.component.html',
  styleUrls: ['./uploadvideo.component.css']
})
export class UploadvideoComponent implements OnInit {


  uploadVideoForm!: FormGroup;
  userId!: number;

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: readonly number[]|ReadonlySet<number>;



  constructor(
    private userservice : UserService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,

   ){}

  ngOnInit(): void {

      this.uploadVideoForm = this.fb.group({
        file: [null, [Validators.required]],
        title: [null, [Validators.required, Validators.minLength(18)]],
        description: [null, [Validators.required,  Validators.minLength(40)]],
        tags: [[]],
      })

  }

  addVideo() {
    if (this.uploadVideoForm.invalid) return;
    const formData = new FormData();
    formData.append('file', this.uploadVideoForm.get('file')?.value);
    formData.append('title', this.uploadVideoForm.get('title')?.value);
    formData.append('description', this.uploadVideoForm.get('description')?.value);
    formData.append('tags', JSON.stringify(this.uploadVideoForm.get('tags')?.value)); // Convert tags array to string
    this.userservice.addVideo(formData).subscribe(
      res => {
        this.snackbar.open('Video added successfully', 'Close', { duration: 3000 });
      },
      err => this.snackbar.open('Failed to add video', 'Close', { duration: 3000 })
    );
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadVideoForm.patchValue({
        file: input.files[0]
      });
    }
  }


     // Method to add tags to form control
     addTag(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      // Add tag only when it's not empty
      if (value) {
        const tags = this.uploadVideoForm.get('tags')?.value as string[];
        tags.push(value);
        this.uploadVideoForm.get('tags')?.setValue(tags);
        event.chipInput!.clear(); // Clear the input
      }
    }

    // Method to remove tags from form control
    removeTag(tag: string): void {
      const tags = this.uploadVideoForm.get('tags')?.value as string[];
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags.splice(index, 1);
        this.uploadVideoForm.get('tags')?.setValue(tags);
      }
    }





}
