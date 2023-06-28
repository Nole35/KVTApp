import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Post } from '../model/post';
import {User} from "../model/user";
import {Roles} from "../model/enums/roles";
import {Group} from "../model/group";
import {Karma} from "../model/karma";
import {ReactionType} from "../model/enums/reactionType";
import {UserService} from "../services/user/user.service";
import {GroupService} from "../services/group/group.service";
import {Router} from "@angular/router";
import {ReactionPostService} from "../services/reactionPost/reactionPost.service";
import {AuthenticationService} from "../services/authentication-service.service";
import {JwtUtilsService} from "../services/jwt-utils.service";



@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input() post!: Post;
  @Output('changed') changed = new EventEmitter<boolean>();

  user: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    roles: Roles.USER
  };

  group: Group = {
    groupId: 0,
    name: '',
    description: '',
    creationDate: null,
    groupAdmin: 0
  };

  karma: Karma = {
    karma: 0
  };


  likeReaction = {
    reactionId: 0,
    type: ReactionType.LIKE,
    timestamp: "",
    user: 0,
    post: 0
  }

  dislikeReaction = {
    reactionId: 0,
    type: ReactionType.DISLIKE,
    timestamp: "",
    user: 0,
    post: 0
  }
  errorMessage: any;


  private logUser: User = {
    userId: 0,
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    roles: 0
  };

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


  token!: string;
  uloga: any;
  noLogUser!: boolean;

  constructor(
    private userService: UserService, private groupService: GroupService,
    private router: Router, private karmaService: ReactionPostService,
    private authService: AuthenticationService, private jwtUtilsService:JwtUtilsService ) {

    this.logUser = authService.getCurrentUser();

  }


  ngOnInit(): void {

    this.groupService.get(this.post.group).subscribe(res => {
      this.group = res;
    })

    this.userService.get(this.post.user).subscribe(res => {
      this.user = res;
    })


    if(this.logUser !== undefined){
      this.userService.getByUsername(this.logUser.username).subscribe(res => {
        this.currentUser = res;
      })
    }

    this.karmaService.getKarmaByPost(this.post.postId).subscribe(res =>{
      this.karma = res;
    })


    if(this.logUser !== undefined){
      this.token = this.authService.getToken();
      this.uloga = this.jwtUtilsService.getRoles(this.token);

    }

    if(this.logUser === undefined){
      this.noLogUser = true;
    }

  }


  groupClick(id:number):void{
    this.router.navigate(['/groupPage/' + id], { state: { id:  id} });
  }

  likeBtn(postId: number): void {
    if (this.noLogUser === true) {
      confirm('Please login!');
    } else {
      this.likeReaction.post = postId;
      this.likeReaction.user = this.currentUser.userId;

      this.karmaService.save(this.likeReaction).subscribe({
        next: (data) => console.log('LIKE REACTION!'),
        error: () => console.log('error'),
        complete: () => this.changed.emit(true)
      });
    }
  }

  dislikeBtn(postId: number): void {
    if (this.noLogUser === true) {
      confirm('Please login!');
    } else {
      this.dislikeReaction.post = postId;
      this.dislikeReaction.user = this.currentUser.userId;

      this.karmaService.save(this.dislikeReaction).subscribe({
        next: (data) => console.log('DISLIKE REACTION'),
        error: () => console.log('error'),
        complete: () => this.changed.emit(true)
      });
    }
  }


}
