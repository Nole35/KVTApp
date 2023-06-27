import { Component, OnInit } from '@angular/core';
import {Group} from "../model/group";
import {GroupService} from "../services/group/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit {

    listGroup: Array<Group> = [];

  constructor(private groupService : GroupService, private router: Router) { }

  ngOnInit(): void {
    this.groupService.getAll().subscribe(res => {
      this.listGroup = res;
    })
  }

  goToGroup(id:number):void{
    this.router.navigate(['/groupPage/' + id], { state: { id:  id} });
  }

}
