import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {ResetPassword} from "../../model/resetPassword";


@Injectable({
  providedIn: 'root'
})
export class UserService{

  private readonly path = "http://localhost:8087/api/users";

  constructor(private http: HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(this.path);
  }

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(this.path+`/onlyUser`);
  }



  getAllGroupAdmins():Observable<User[]>{
    return this.http.get<User[]>(this.path+`/onlyGroupAdmins`);
  }

  get(id:number):Observable<User>{
    return this.http.get<User>(this.path+`/byId/${id}`);
  }

  getByUsername(username:string):Observable<User>{
    return this.http.get<User>(this.path+`/${username}`);
  }

  save(user:User){
    return this.http.post(this.path+`/create`, user);
  }

  changeData(user:User): Observable<any>{
    return this.http.put(`${this.path}/changeData/${user.username}`,{
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }, {responseType: 'text'});
  }

  changePassword(password:ResetPassword,username:string): Observable<any>{
    return this.http.put(`${this.path}/${username}`,{
      oldPassword: password.oldPassword,
      newPassword: password.newPassword
    }, {responseType: 'text'});
  }


  changeUserToGroupAdmin(id:number){
    return this.http.delete(`${this.path}/changeUserToGroupAdmin/${id}`);
  }

}
