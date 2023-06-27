import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterModule, Routes } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarUserComponent } from './navigation-bar-user/navigation-bar-user.component';
import { NavigationBarGroupadminComponent } from './navigation-bar-groupadmin/navigation-bar-groupadmin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserPostsPageComponent } from './user-posts-page/user-posts-page.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserAccountDataComponent } from './user-account-data/user-account-data.component';
import { UpdateGroupPageComponent } from './update-group-page/update-group-page.component';
import { UpdateGroupCardComponent } from './update-group-card/update-group-card.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { SinglePostUpdateComponent } from './single-post-update/single-post-update.component';
import { HomeComponent } from './home/home.component';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CardPostComponent } from './card-post/card-post.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { AddPostComponent } from './add-post/add-post.component';
import { NavigationBarAdminComponent } from './navigation-bar-admin/navigation-bar-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {MDBBootstrapModule, NavbarModule} from "angular-bootstrap-md";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationService} from "./services/authentication-service.service";
import {CanActivateAuthGuard} from "./services/can-active-auth.guard";
import {CustomvalidationService} from "./services/customvalidation.service";
import {JwtUtilsService} from "./services/jwt-utils.service";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NavigationBarComponent,
    NavigationBarUserComponent,
    NavigationBarGroupadminComponent,
    SignupComponent,
    LoginComponent,
    UserPostsPageComponent,
    UserPostsComponent,
    UserAccountDataComponent,
    UpdateGroupPageComponent,
    UpdateGroupCardComponent,
    SinglePostComponent,
    SinglePostUpdateComponent,
    HomeComponent,
    DialogAddGroupComponent,
    GroupPageComponent,
    ChangePasswordComponent,
    CardPostComponent,
    AllGroupsComponent,
    AddPostComponent,
    NavigationBarAdminComponent
  ],
//     imports: [
//       BrowserModule,
//       HttpClientModule,
//         RouterModule,
//         FormsModule,
//         ReactiveFormsModule,
//         // NavbarModule,
//         MDBBootstrapModule,
//          MatDialogModule,
//          BrowserAnimationsModule,
//       RouterModule.forRoot([]),
//       AppRoutingModule
//
//
//     ],
//   providers: [
//     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
//     AuthenticationService,
//     CanActivateAuthGuard,
//     CustomvalidationService,
//     JwtUtilsService,
//     TokenInterceptorService,
//     JwtHelperService,
//     GroupPageComponent
//
//   ],
//
//   bootstrap: [AppComponent]
// })
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [GroupPageComponent, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
