import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Karma} from "../model/karma";
import {AuthenticationService} from "../services/authentication-service.service";
import {UserService} from "../services/user/user.service";
import {ReactionPostService} from "../services/reactionPost/reactionPost.service";

@Component({
  selector: 'app-user-account-data',
  templateUrl: './user-account-data.component.html',
  styleUrls: ['./user-account-data.component.css']
})
export class UserAccountDataComponent implements OnInit {


  public logUser: User;
  public token: string = '';


  btnValue = "CHANGE";

  isReadOnly = true;


  userForm: FormGroup;

  public user: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    roles: 0
  };
  errorMessage: any;


  constructor(private authService: AuthenticationService, private userService: UserService,
              private reactionPostService: ReactionPostService,
              private fb: FormBuilder) {

    this.logUser = authService.getCurrentUser();
    this.getUserData();


    this.userForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }


  ngOnInit(): void {

  }

  getUserData(){
    this.userService.getByUsername(this.logUser.username).subscribe(res => {
      this.user = res;
    })
  }

  submit(userId:number):void{

    if(this.btnValue === "CHANGE"){
      this.isReadOnly = false;
      this.btnValue = "SUBMIT"
    }else if(this.btnValue === "SUBMIT"){

      this.isReadOnly = true;
      this.btnValue = "CHANGE";

      this.userService.changeData(this.user).subscribe({
        next: data => {
          console.log("Successful change data");
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

    }


  }


}
