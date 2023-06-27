import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../../model/group";


@Injectable({
  providedIn: 'root'
})
export class GroupService{

  private readonly path = "http://localhost:8087/api/`group`";

  constructor(private http: HttpClient) { }

  getAll():Observable<Group[]>{
    return this.http.get<Group[]>(this.path);
  }

  get(id:number):Observable<Group>{
    return this.http.get<Group>(`${this.path}/${id}`);
  }


  save(group:Group): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      name: group.name,
      description: group.description,
      groupAdmin: group.groupAdmin
    }, {responseType: 'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }

  change(group:Group){
    return this.http.put(`${this.path}/${group.groupId}`, group);
  }
}
