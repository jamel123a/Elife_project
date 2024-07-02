import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frondend';

  isUserLogged : boolean = StorageService.isUserLogged();
  isAdminLogged : boolean =StorageService.isAdminLogged();

  constructor(private router : Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isUserLogged=StorageService.isUserLogged();
      this.isAdminLogged=StorageService.isAdminLogged();

    })
  }


}
