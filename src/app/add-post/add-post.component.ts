import { Component, OnInit } from '@angular/core';
import {Post} from "../model/post";
import {User} from "../model/user";
import {Roles} from "../model/enums/roles";
import { MatDialog } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post/post.service";
import {UserService} from "../services/user/user.service";
import {AuthenticationService} from "../services/authentication-service.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  public groupId:number;


  newPost:Post = {
    postId: 0,
    content: '',
    creationDate: '',
    imagePath: '',
    group: 0,
    user: 0
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

  errorMessage: any;


  postForm: FormGroup = {} as FormGroup;

  constructor(private routers : Router, private router: ActivatedRoute, public dialog : MatDialog, private postService: PostService
    , private authService: AuthenticationService, private userService:UserService
    , private fb: FormBuilder) {
    this.groupId = this.router.snapshot.params['id'];
    this.logUser = authService.getCurrentUser();
    this.getCurrentUser();
  }

  ngOnInit(): void {

    this.postForm = this.fb.group({
      content: new FormControl('', [Validators.required]),

    });

  }

  getCurrentUser(){
    this.userService.getByUsername(this.logUser.username).subscribe({
      next: data => this.currentUser = data,
      error: err => console.log(err),
      complete: () => console.log('complete')
    });
  }

  createPost():void{
    this.newPost.group = this.groupId;
    this.newPost.user = this.currentUser.userId;


    const request = {
      'content': this.newPost.content,
      'group': this.newPost.group,
      'user': this.newPost.user
    }

    if(this.newPost.content){
      this.postService.save(request).subscribe({
        next: data => {
          console.log("Success add post"),
            this.goToGroupPage()
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      })

    }else{
      confirm("ERROR")
    }


  }



  goToGroupPage(){
    this.routers.navigate(['/groupPage/' + this.groupId], { state: { id:  this.groupId} });
  }



}
