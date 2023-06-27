import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication-service.service";
import {Router} from "@angular/router";
import {JwtUtilsService} from "../services/jwt-utils.service";
import { IconsModule } from 'angular-bootstrap-md';


@Component({
  selector: 'app-navigation-bar-user',
  templateUrl: './navigation-bar-user.component.html',
  styleUrls: ['./navigation-bar-user.component.css']
})
export class NavigationBarUserComponent implements OnInit {


  public user : boolean = false
  public blockUser : boolean = false

  private logUser: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    registrationDate: '',
    firstName: '',
    lastName: '',
    roles: 0
  };



  // token : string;
  token:string = "";
  uloga:any;

  constructor(private authService: AuthenticationService, private router: Router, private jwtUtilsService:JwtUtilsService) {
    this.logUser = authService.getCurrentUser();
  }

  ngOnInit(): void {

    if(this.logUser !== undefined){
      this.token = this.authService.getToken();
      this.uloga = this.jwtUtilsService.getRoles(this.token);

      if(this.uloga[0].authority === "ROLE_USER"){
        this.user = true;
      }
    }

  }

  logOut():void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }



}
