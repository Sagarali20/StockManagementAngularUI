import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl:string ='http://localhost:5275/api/Inventory';


  constructor(private http: HttpClient) { }

  SaveCategory(categoryObj:any)
  {
     return this.http.post<any>(`${this.baseUrl}/category`,categoryObj);
  }

  GetAllCategory()
  {
    return this.http.get<any>(`${this.baseUrl}/getallcategory`);
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
