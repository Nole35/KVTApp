import { Component, OnInit } from '@angular/core';
import {Post} from "../model/post";
import {Router} from "@angular/router";
import {PostService} from "../services/post/post.service";
import {UserService} from "../services/user/user.service";
import {GroupPageComponent} from "../group-page/group-page.component";
import {GroupService} from "../services/group/group.service";

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.css']
})
export class CardPostComponent implements OnInit {
  postList: Array<Post> = [];


  constructor(private router: Router, private postService: PostService, private userService: UserService,
              private groupService:GroupService, private groupPage: GroupPageComponent) {

  }

  public ngOnInit(): void {

    this.getAllPosts();

  }

  private getAllPosts(): void {
    this.postService.getAll().subscribe(res => {
      this.postList = res;
    })

  }


  groupClick(id:number):void{
    this.router.navigate(['/groupPage/' + id], { state: { id:  id} });
  }


  public changed(event: any): void {
    this.getAllPosts();
  }

}
