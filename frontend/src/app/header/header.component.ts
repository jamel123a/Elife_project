import { Component, OnInit } from '@angular/core';
import { StorageService } from '../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserLogged : boolean = StorageService.isUserLogged();
  isAdminLogged : boolean =StorageService.isAdminLogged();

  constructor(private router : Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isUserLogged=StorageService.isUserLogged();
      this.isAdminLogged=StorageService.isAdminLogged();

    })
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
