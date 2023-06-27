import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {Roles} from "../model/enums/roles";
import {Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // user:User;
  // userForm: FormGroup;
  user: User = {} as User;
  userForm: FormGroup = {} as FormGroup;
  userEmails: FormGroup = {} as FormGroup;

  newUser = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: Roles.USER,
    registrationDate: ''
  }

  // userEmails: FormGroup;


  constructor(private router : Router, public dialog : MatDialog,
              private userService: UserService, private fb: FormBuilder) {


  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      username: ['', Validators.required ],
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")] ]
    });

  }


  signUpClick(): void{

    if(this.userForm.valid){
      this.router.navigate(["/logIn"]);
      this.userService.save(this.newUser).subscribe({
        next: (data) => console.log(data),
        error: () => console.log('error')
      })

    }else{
      confirm("ERROR")
    }


  }


}
