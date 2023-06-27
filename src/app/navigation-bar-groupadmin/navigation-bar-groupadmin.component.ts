import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar-groupadmin',
  templateUrl: './navigation-bar-groupadmin.component.html',
  styleUrls: ['./navigation-bar-groupadmin.component.css']
})
export class NavigationBarGroupadminComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut():void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
