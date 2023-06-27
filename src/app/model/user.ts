import {Roles} from "./enums/roles";

export interface User{

  userId:number;
  username:string;
  password:string;
  email:string;
  registrationDate:string;
  firstName:string;
  lastName:string;
  roles:Roles;


}
