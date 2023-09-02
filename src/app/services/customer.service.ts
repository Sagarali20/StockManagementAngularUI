import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseUrl from '../helpers/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl:string =BaseUrl.Url;

  constructor(private http:HttpClient) { }

  SaveCustomer(Obj:any)
  {
     return this.http.post<any>(`${this.baseUrl}/api/customer/add-customer`,Obj);
  }
  
  GetCustomerbyId(id:number)
  {
     return this.http.post<any>(this.baseUrl+'/api/customer/get-customer-by-id?id='+ id, null);
  }

   GetAllCustomers(Obj:any)
  {
    console.log(Obj);
    // return this.http.post<any>(`${this.baseUrl}/api/customer/getall-customer`,Obj);
     return this.http.post<any>(`${this.baseUrl}/api/customer/getall-customer`,Obj);

  }



}
