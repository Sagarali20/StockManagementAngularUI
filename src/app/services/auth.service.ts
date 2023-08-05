import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private baseUrl:string ='http://localhost:5275/api/User/';
  // private baseUrl:string ='http://192.168.1.106:82/api/User/';


  private userPayload:any;

  constructor(private http: HttpClient) {

    this.userPayload=this.deCodedToken();
    console.log("sagar");

    //console.log(this.userPayload);
   }

  signUp(userObj:any)
  {
     return this.http.post<any>(`${this.baseUrl}register`,userObj);

  }

  logIn(loginobj:any)
  { 
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginobj);
  }

  storeToken(tokenvalue:string)
  {
        localStorage.setItem('token',tokenvalue);
  }

  storeRefreshToken(tokenvalue :string)
  {
    localStorage.setItem('refreshtoken',tokenvalue);

  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  getRefreashToken()
  {
    return localStorage.getItem('refreshtoken');
  }


  isLoggedIn():boolean
  { 
    return !!localStorage.getItem('token');
  }
  signOut()
  {
    localStorage.clear();

  }
  deCodedToken()
  {
    const jwthelper= new JwtHelperService();
    const token = this.getToken()!;
    return jwthelper.decodeToken(token);
  }
  getfullnameFromtoken()
  {
     if(this.userPayload)
     return this.userPayload.unique_name;
  }
  getroleFromToken()
  {
    if(this.userPayload)
    return this.userPayload.role;
  }
  renewtoken(tokenapi:TokenApiModel)
  { 
     return this.http.post<TokenApiModel>(`${this.baseUrl}refresh`,tokenapi);
  }

  // renewtoken(tokenApiModel: TokenApiModel): Observable<any> {
  //   const url = this.baseUrl+"refresh";
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  
  //   // Make the API request using HttpClient
  //   return this.http.post(url, tokenApiModel, httpOptions);
  // }
  


}
