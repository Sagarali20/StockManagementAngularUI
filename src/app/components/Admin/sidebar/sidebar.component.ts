import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router,private auth:AuthService)
  {
    
  }
  ngOnInit(): void {
    
  }
  Logout()
  { 
    this.auth.signOut();
     this.router.navigate(['login']);  
   // window.location.href='/login';
  
  }

}
