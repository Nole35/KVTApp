import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../model/post";


@Injectable({
  providedIn: 'root'
})
export class PostService{

  private readonly path = "http://localhost:8087/api/post";

  constructor(private http: HttpClient) { }

  getAll():Observable<Post[]>{
    return this.http.get<Post[]>(this.path);
  }

  getGroupPosts(id:number):Observable<Post[]>{
    return this.http.get<Post[]>(this.path+`/group`+`/${id}`);
  }

  get(id:number):Observable<Post>{
    return this.http.get<Post>(this.path+`/${id}`);
  }

  save(post: any): Observable<any>{
    return this.http.post(`${this.path}/create`,{
      content: post.content,
      group: post.group,
      user: post.user
    }, {responseType: 'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.path}/${id}`);
  }

  getOneUserPosts(username:string):Observable<Post[]>{
    return this.http.get<Post[]>(this.path+`/user`+`/${username}`);
  }

  change(post:Post){
    return this.http.put(`${this.path}/${post.postId}`, post);
  }

}
