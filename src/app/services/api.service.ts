import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseUrl:string ='http://localhost:5275/api/User/';
  // private baseUrl:string ='http://192.168.1.106:82/api/User/';


  constructor(private http: HttpClient) { }
 
  getUser()
  {
    return this.http.get<any>(this.baseUrl);
  }

}
