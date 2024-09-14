import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const Basic_URL ="http://localhost:4201/"

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http : HttpClient) { }


/// pass jwt in headers
  private createAuthorizationHeader() : HttpHeaders{
    console.log(StorageService.getToken())
    return new HttpHeaders().set(
       'Authorization','Bearer '+ StorageService.getToken()

      )
}




   //////////////! gestion de user ///////////
  getUsers(): Observable<any> {
    return this.http.get(Basic_URL + "api/admin/users", {
      headers: this.createAuthorizationHeader()
    });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(Basic_URL + `api/admin/users/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  addUser(user: any): Observable<any> {
    return this.http.post(Basic_URL + "api/admin/users", user, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(Basic_URL + `api/admin/users/${id}`, user, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(Basic_URL + `api/admin/users/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }


/// ! gestion de videos
/// get all video attende
getAllPublicVideo(): Observable<any> {
  return this.http.get(Basic_URL + "api/videos/public", {
    headers: this.createAuthorizationHeader()
  });
}


getAllAttendeVideo(): Observable<any> {
  return this.http.get(Basic_URL + "api/videos/attende", {
    headers: this.createAuthorizationHeader()
  });
}


getVideo(videoId: string): Observable<any> {
  return this.http.get(Basic_URL + `api/videos/${videoId}`, {
    headers: this.createAuthorizationHeader()
  });
}


addVideo(video: FormData): Observable<any> {
  return this.http.post(Basic_URL + "api/videos/upload", video, {
    headers: this.createAuthorizationHeader()
  });
}

updateVideo(id: string, video: any): Observable<any> {
  return this.http.put(Basic_URL + `api/videos/${id}`, video, {
    headers: this.createAuthorizationHeader()
  });
}

deleteVideo(id: string): Observable<any> {
  return this.http.delete(Basic_URL + `api/videos/${id}`, {
    headers: this.createAuthorizationHeader()
  });
}

changeVideoStatus(videoId: string, newStatus: string): Observable<any> {
  return this.http.put(Basic_URL + `api/videos/${videoId}/status?newStatus=${newStatus}`, {}, {
    headers: this.createAuthorizationHeader()
  })
}

private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);


}


}

