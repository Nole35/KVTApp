import { Component, OnInit } from '@angular/core';
import {Group} from "../model/group";
import {User} from "../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post/post.service";
import {GroupService} from "../services/group/group.service";
import {JwtUtilsService} from "../services/jwt-utils.service";
import {AuthenticationService} from "../services/authentication-service.service";
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  public groupId:number;
  // public group:Group;
  public group: Group = {} as Group;
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
  public canDelete: boolean = false;
  public canEdit: boolean = false;

  uloga:any;
  // token:string;
  token: string = '';
  public admin : boolean = false
  public groupAdmin : boolean = false
  public user : boolean = false

  constructor(
    private router: ActivatedRoute, private routers: Router, private postService: PostService,
    private groupService: GroupService, private jwtUtilsService: JwtUtilsService,
    private userService: UserService,
    private authService: AuthenticationService) {

    this.logUser = authService.getCurrentUser();
    this.groupId = this.router.snapshot.params['id'];
    this.getGroup();
    this.getLogUser();
  }

  getGroup():void{
    this.groupService.get(this.groupId).subscribe(res => {
      this.group = res;
      this.userService.getByUsername(this.logUser.username).subscribe((resp) => {
        if (this.group.groupAdmin === resp.userId) {
          this.canDelete = true;
        }
      })
      console.log(res);
    })
  }


  ngOnInit(): void {

  }

  // goToRules():void{
  //   this.routers.navigate(['/communityRules/' + this.communityId], { state: { id:  this.communityId} });
  // }
  //
  // goToFlairs():void{
  //   this.routers.navigate(['/communityFlairs/' + this.communityId], { state: { id:  this.communityId} });
  // }

  goToAddPost():void{
    this.routers.navigate(['/addPost/' + this.groupId], { state: { id:  this.groupId} });
  }


  getLogUser(){

    if(this.logUser !== undefined){
      this.token = this.authService.getToken();
      this.uloga = this.jwtUtilsService.getRoles(this.token);

      if(this.uloga[0].authority === "ROLE_USER"){
        this.user = true;
      }else if(this.uloga[0].authority === "ROLE_GROUPADMIN"){
        this.groupAdmin = true;
        console.log(this.groupAdmin)
      }else if(this.uloga[0].authority === "ROLE_ADMIN"){
        this.admin = true;
      }

    }

  }


  deleteGroup(id: number): void {
    this.groupService.delete(id).subscribe((resp) => {
      console.log(resp)
      window.location.reload();
    })
  }

  changeContentSumbit(group: any): void {
    this.groupService.change(group).subscribe((resp) => {
      this.canEdit = false;
    });
  }

  changeGroup(): void {
    this.canEdit = true;
  }
}
