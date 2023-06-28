import { Component, OnInit } from '@angular/core';
import {Group} from "../model/group";
import {User} from "../model/user";
import {Roles} from "../model/enums/roles";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user/user.service";
import {AuthenticationService} from "../services/authentication-service.service";
import {GroupService} from "../services/group/group.service";

@Component({
  selector: 'app-dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.css']
})
export class DialogAddGroupComponent implements OnInit {

  newGroup:Group = {
    groupId: 0,
    name: '',
    description: '',
    creationDate: null,
    groupAdmin: 2
  }
  logUser:User;
  currentUser:User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    roles: Roles.USER
  }

  // requiredForm: FormGroup;
  requiredForm!: FormGroup;
  userRoles = Roles.USER;

  constructor(private router:Router, private groupService:GroupService, private userService:UserService,
              private authService:AuthenticationService, private fb: FormBuilder) {
    this.logUser = authService.getCurrentUser();




  }

  ngOnInit(): void {

    this.userService.getByUsername(this.logUser.username).subscribe(res => {
      this.currentUser = res;
    })

    this.requiredForm = this.fb.group({
      name: ['', Validators.required ],
      description: ['', Validators.required]
    });

  }



  btnCreateGroup(){

    console.log(this.requiredForm.valid)

    if(this.requiredForm.valid){
      this.addGroup();
    }else{
      confirm("Error!")
    }


  }


  addGroup(): void {
    this.newGroup.groupAdmin = this.currentUser.userId;

    this.groupService.save(this.newGroup).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: () => console.log('error'),
      complete: () => {

        if(this.currentUser.roles.toString() === "USER"){
          this.changeUserToGroupAdmin();
        } else {
          this.router.navigate(['/home']);
          window.location.reload();
        }
      }
    })
  }

  changeUserToGroupAdmin(){
    console.log('here')
    this.userService.changeUserToGroupAdmin(this.currentUser.userId).subscribe({
      next:(data) => {
        console.log(this.currentUser.username + " is now grAdmin!")
        this.authService.logout();
        this.router.navigate(['/home']);
        window.location.reload();
      },
      error: () => console.log('error')
    })
  }

}
