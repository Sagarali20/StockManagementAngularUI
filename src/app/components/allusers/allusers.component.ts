import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent implements OnInit {

 public Users:any=[];

 constructor(private api:APIService)
 {

 }
  ngOnInit(): void {

    this.api.getUser().subscribe(res =>{
      console.log(res);
      this.Users=res.users;
     });
  }

}
