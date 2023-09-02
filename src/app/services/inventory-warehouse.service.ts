import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseUrl from '../helpers/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class InventoryWarehouseService {

  private baseUrl:string =BaseUrl.Url;


  constructor(private http: HttpClient) { }

  SaveWarehouse(Obj:any)
  {
    console.log(Obj);
     return this.http.post<any>(`${this.baseUrl}/api/inventory/add-inventory-warehouse`,Obj);
  }

  GetAllWarehouse(id:any)
  {
    console.log(id);
    return this.http.get<any>(this.baseUrl+'/api/inventory/getall-inventoryWarehouse-by-guidid?id='+ id);

  }

}
