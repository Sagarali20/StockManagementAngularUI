import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BaseUrl from '../helpers/BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private baseUrl:string =BaseUrl.Url;


  constructor(private http: HttpClient) { }

  SaveEquipment(Obj:any)
  {
     return this.http.post<any>(`${this.baseUrl}/api/inventory/add-equipment`,Obj);
  }

  GetAllEquipment()
  {
    return this.http.get<any>(`${this.baseUrl}/api/inventory/getall-equipment`);
  }

  deleteEquipment(id: number) {
    return this.http.post<any>(this.baseUrl+ '/api/inventory/delete-equipment?id=' + id, null); // Use null or a request body if needed
  }

  FilterEquipment(Obj:any)
  {

     return this.http.post<any>(`${this.baseUrl}/api/inventory/getall-equipment`,Obj);
  }

  GetEquipmentbyId(id:number)
  {
     return this.http.post<any>(this.baseUrl+'/api/inventory/get-equipment-by-id?id='+ id, null);
  }

}
