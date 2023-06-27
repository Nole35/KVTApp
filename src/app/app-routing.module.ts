import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { CardPostComponent } from './card-post/card-post.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateGroupPageComponent } from './update-group-page/update-group-page.component';
import { UserAccountDataComponent } from './user-account-data/user-account-data.component';
import { UserPostsPageComponent } from './user-posts-page/user-posts-page.component';
import { UserPostsComponent } from './user-posts/user-posts.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },

  {
    path: 'addPost/:id',
    component: AddPostComponent
  },

  {
    path: 'userAccountData',
    component: UserAccountDataComponent
  },


  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },



  {
    path: 'groupPage/:id',
    component: GroupPageComponent
  },

  {
    path:'addGroup',
    component: DialogAddGroupComponent
  },

  {
    path: 'signUp',
    component: SignupComponent
  },

  {
    path: 'groupAdminGroup',
    component: UpdateGroupPageComponent
  },

  {
    path: 'logIn',
    component: LoginComponent
  },

  {
    path: 'usersPosts',
    component: UserPostsPageComponent
  },

  {
    path: '**',
    component: HomeComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
