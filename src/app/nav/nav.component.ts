import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication-service.service";
import {JwtUtilsService} from "../services/jwt-utils.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  public admin : boolean = false
  public groupAdmin : boolean = false
  public user : boolean = false

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



  token: string = '';

  // token:string;
  uloga:any;

  constructor(private authService: AuthenticationService, private jwtUtilsService: JwtUtilsService, private userService:UserService,
              private router:Router) {

    this.logUser = authService.getCurrentUser();

  }

  ngOnInit(): void {

    if(this.logUser !== undefined){
      this.token = this.authService.getToken();
      this.uloga = this.jwtUtilsService.getRoles(this.token);

      if(this.uloga[0].authority === "ROLE_USER"){
        console.log("ULOGOVAO SE USER")
        this.user = true;
        this.router.navigate(['/home']);
      }else if(this.uloga[0].authority === "ROLE_GROUPADMIN"){
        console.log("ULOGOVAO SE GROUPADMIN")
        this.groupAdmin = true;
        this.router.navigate(['/home']);
      }else if(this.uloga[0].authority === "ROLE_ADMIN"){
        console.log("ULOGOVAO SE ADMIN")
        this.admin = true;
        this.router.navigate(['/home']);
      }
    }


  }



}
