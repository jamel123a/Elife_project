import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Basic_URL ="http://localhost:4201/"

@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {

  constructor(private http : HttpClient) { }



  getVideo(videoId: string): Observable<any> {
    return this.http.get(Basic_URL + `api/videos/${videoId}`,
    );
  }



}
