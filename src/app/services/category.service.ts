import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseUrl from '../helpers/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl:string =BaseUrl.Url;


  constructor(private http: HttpClient) { }

  SaveCategory(categoryObj:any)
  {
     return this.http.post<any>(`${this.baseUrl}/api/Inventory/category`,categoryObj);
  }

  GetAllCategory()
  {
    return this.http.get<any>(`${this.baseUrl}/api/Inventory/getallcategory`);
  }

  DeleteCategory(id:any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.post<any>(url,id);
  }
  // {
   
  //  //var sdf  =  
  // //  console.log(sdf);

  //  alert(id);
  //  //return this.http.post<any>(`${this.baseUrl}`,+id);
  //  return this.http.post<any>(this.baseUrl, id);

  //  //return this.http.post(this.baseUrl,+id)

    

  // }
}
