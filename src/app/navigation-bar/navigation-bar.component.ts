import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    public dialogLogIn: MatDialog,
    public dialogSign: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialogSignUp(): void {
    const dialogConfig = new MatDialogConfig();
    this.dialogSign.open(SignupComponent, dialogConfig);
  }
}

