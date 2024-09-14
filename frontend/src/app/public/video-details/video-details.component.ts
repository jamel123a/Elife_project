import { Component } from '@angular/core';
import { PublicServiceService } from '../services/public-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent {
  videoId: string | null = null;
  videoDetails: any;
  videoUrl = '../assets/img.mp4'

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('videoId');
      if (this.videoId) {
        this.getVideoDetails(this.videoId);
      }
    });
  }

  getVideoDetails(videoId: string): void {
    this.publicService.getVideo(videoId).subscribe(
      (data) => {
        this.videoDetails = data;
      },
      (error) => {
        console.error('Error fetching video details:', error);
      }
    );
  }

}
