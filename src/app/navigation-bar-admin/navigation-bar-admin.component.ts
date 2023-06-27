import {Component, NgModule, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication-service.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-navigation-bar-admin',
  templateUrl: './navigation-bar-admin.component.html',
  styleUrls: ['./navigation-bar-admin.component.css']
})
export class NavigationBarAdminComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  logOut():void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
