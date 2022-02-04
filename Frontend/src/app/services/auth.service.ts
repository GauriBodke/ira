import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , EMPTY, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators'
import { NONE_TYPE } from '@angular/compiler';
import { Router } from '@angular/router';
import { User } from '../user';

var AuthorizationString = "Bearer "+ localStorage.getItem("ACCESS_TOKEN")
var headers_object = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization' : AuthorizationString})

const httpOptions = {
  headers: headers_object
}




@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // private apiUrl = "http://10.20.106.6:8080/instructor/"

  private apiUrl: string = "http://172.16.109.140:8080/instructor/"
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // authSubject  =  new  BehaviorSubject(false);
  // loginObject! : JSON

  //future use;
  // signIn(user: User) {
  //   return this.http.post<any>(`${this.apiUrl}/signin`, user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token)
  //       // this.getUserProfile(res._id).subscribe((res) => {
  //       //   this.currentUser = res;
  //       //   this.router.navigate(['user-profile/' + res.msg._id]);
  //       // })
  //     })
  // }

  login(username: string, password: string): Observable<any>{
    console.log("in service");
    console.log(username);
    console.log(password);

    var obj = {"email": username, "password": password};
    console.log(obj);
    

    // return this.http.post<any>(this.apiUrl, obj, httpOptions);
    return this.http.post<any>(this.apiUrl + "login", obj).pipe(
      tap((res) => {
        if (res){
          localStorage.setItem("ACCESS_TOKEN", res.token);
          // localStorage.set("ACCESS_TOKEN", res.token);
          // this.authSubject.next(true);
        }
      })
    );
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('ACCESS_TOKEN');
    return (authToken !== null) ? true : false;
  }

  getToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  logOut(){
    localStorage.removeItem("ACCESS_TOKEN");
    // this.authSubject.next(false);
    // return this.http.post<any>(this.apiUrl + "logout", null, httpOptions);
  }

  register(username: string, password: string): Observable<any>{

    var obj = {"email": username, "password": password};
    console.log(obj);

    console.log(this.apiUrl + "register");
    return this.http.post<any>(this.apiUrl + "register", obj);


  }


}