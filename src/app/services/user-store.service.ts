import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullname$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore()
  {
      return this.role$.asObservable();
  }

  public SetRoleFromStore(roel:string)
  {
    return this.role$.next(roel);
  }

  public getFullNameFromStore()
  {
    return this.fullname$.asObservable();
  }

  public setFullNameFromStore(fullname:string)
  {
     return  this.fullname$.next(fullname);
  }

}
