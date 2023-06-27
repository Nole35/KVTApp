// import { Component, OnInit } from '@angular/core';
// import {JwtAuthenticationRequest} from "../model/JwtAuthenticationRequest";
// import {AuthenticationService} from "../services/authentication-service.service";
// import {Router} from "@angular/router";
// import {throwError} from "rxjs";
// import { Injectable } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationRequest } from '../model/JwtAuthenticationRequest';
import { AuthenticationService } from '../services/authentication-service.service'; // Update the path if needed
import { Router } from '@angular/router';
import { throwError } from 'rxjs';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {


  // username: string;
  // password: string;
  username: string = '';
  password: string = '';


  newUser: JwtAuthenticationRequest = {
    username: '',
    password: ''
  }

  public wrongUsernameOrPass:boolean;

  constructor(private authService : AuthenticationService, private router : Router) {
    this.wrongUsernameOrPass = false;
  }

  ngOnInit() {
  }

  login():void{
    this.authService.login(this.newUser).subscribe(
      (loggedIn:boolean) => {
        if(loggedIn){
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }
      ,
      (err:Error) => {
        if(err.message === 'error.json is not a function'){
          this.wrongUsernameOrPass = true;
        }
        else{
          throwError(() => err);
        }
      });
  }





}

