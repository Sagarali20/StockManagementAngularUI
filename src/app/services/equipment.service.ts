import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private baseUrl:string ='http://localhost:5275/api/inventory';


  constructor(private http: HttpClient) { }

  SaveEquipment(Obj:any)
  {
     return this.http.post<any>(`${this.baseUrl}/add-equipment`,Obj);
  }

  GetAllEquipment()
  {
    return this.http.get<any>(`${this.baseUrl}/getall-equipment`);
  }

  deleteEquipment(id: number) {
    return this.http.post(this.baseUrl+ '/delete-equipment?id=' + id, null); // Use null or a request body if needed
  }
}
