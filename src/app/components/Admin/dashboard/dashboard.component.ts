import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  public Users:any=[];

  public fullname:string="";
  public role:string="";

  constructor(private api:APIService ,private router:Router,private auth:AuthService,private userstore:UserStoreService,private url: ActivatedRoute){}

  ngOnInit(): void {

    const url = this.router.url;
    console.log(url);
    // if(url==='/dashboard/category')
    // {
    //   this.router.navigate(['dashboard/category']);
    // }
    // else{
    //   this.router.navigate(['dashboard/']);

    // }

      //  this.api.getUser().subscribe(res =>{
      //   console.log(res);
      //   this.Users=res.users;
      //  });

       this.userstore.getFullNameFromStore().subscribe(val =>{

          let fullnameFromToken = this.auth.getfullnameFromtoken();

          this.fullname=val || fullnameFromToken;
       
       })

       this.userstore.getRoleFromStore().subscribe(val =>{
      
        let userrole=this.auth.getroleFromToken();
        this.role=val || userrole;
         
        console.log("rolestart");
        console.log(val);
        console.log(userrole);

       })

 
  }
  ngAfterViewInit() {

    // A $( document ).ready() block.

    this.loadScript('assets/vendor/js/helpers.js', () => {
      this.loadScript('assets/js/config.js', () => {
        this.loadScript('assets/vendor/libs/jquery/jquery.js', () => {
          // Callback after loading all three scripts
          this.loadScript('assets/vendor/libs/popper/popper.js', () => {
            // Callback after loading all three scripts
            this.loadScript('assets/vendor/js/bootstrap.js', () => {
              // Callback after loading all three scripts
              this.loadScript('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js', () => {
                // Callback after loading all three scripts
                this.loadScript('assets/vendor/js/menu.js', () => {
                  // Callback after loading all three scripts
               
                    this.loadScript('assets/js/main.js', () => {
                

                    });
              
                });
              });
            });
          });
        });
      });
    });
  }
  private loadScript(src: string, callback: () => void) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  }

  
Alluser()
{
  this.router.navigate(['allusers']);
}

  Logout()
  { 
    this.auth.signOut();
     this.router.navigate(['login']);  
   // window.location.href='/login';
  
  }
}
