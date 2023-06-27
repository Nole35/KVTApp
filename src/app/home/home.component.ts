import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.isLoggedIn = localStorage.getItem('currentUser') ? true : false;
  }

  public ngOnInit(): void {
  }







}
