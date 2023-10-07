import { Injectable } from '@angular/core';
import BaseUrl from '../helpers/BaseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {
  private baseUrl:string =BaseUrl.Url;

  constructor(private http: HttpClient) { }

  GetCustomerBySearch(Search:any)
  {
   // return this.http.post<any>(this.baseUrl+'/api/customer/get-customer-by-search-name?searchText='+ Search);
    return this.http.post<any>(this.baseUrl+'/api/customer/get-customer-by-search-name?searchText='+ Search, null);

  }
  GetInvoiceId()
  {
    return this.http.post<any>(this.baseUrl+'/api/InvoiceService/get-invoice-id',null);
  }

}
