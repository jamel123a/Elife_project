import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


const Basic_URL ="http://localhost:4201/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  /// pass jwt in headers
  private createAuthorizationHeader() : HttpHeaders{
    console.log(StorageService.getToken())
    return new HttpHeaders().set(
       'Authorization','Bearer '+ StorageService.getToken()

      )
}

addVideo(video: FormData): Observable<any> {
  return this.http.post(Basic_URL + "api/videos/upload", video, {
    headers: this.createAuthorizationHeader()
  });
}


}
