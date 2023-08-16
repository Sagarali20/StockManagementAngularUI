import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryWarehouseService {

  private baseUrl:string ='http://localhost:5275/api/inventory';


  constructor(private http: HttpClient) { }

  SaveWarehouse(Obj:any)
  {
    console.log(Obj);
     return this.http.post<any>(`${this.baseUrl}/add-inventory-warehouse`,Obj);
  }

  GetAllWarehouse()
  {
    return this.http.get<any>(`${this.baseUrl}/getall-inventoryWarehouse`);
  }

}
