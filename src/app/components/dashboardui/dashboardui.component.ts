import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboardui',
  templateUrl: './dashboardui.component.html',
  styleUrls: ['./dashboardui.component.scss']
})



export class DashboarduiComponent implements OnInit {
  
  public Users:any=[];


  constructor(private api:APIService){}


  ngOnInit(): void {
   
    // if(url==='/dashboard/alluser')
    // {
    //   this.router.navigate(['dashboard/alluser']);
    // }
    // else{
    //   this.router.navigate(['dashboard/']);

    // }

      //  this.api.getUser().subscribe(res =>{
      //   console.log(res);
      //   this.Users=res.users;
      //  });
  }
  ngAfterViewInit() {

    // A $( document ).ready() block.

    this.loadScript('assets/vendor/js/menu.js', () => {
      // Callback after loading all three scripts
      this.loadScript('assets/vendor/libs/apex-charts/apexcharts.js', () => {
        this.loadScript('assets/js/main.js', () => {
          // Callback after loading all three scripts
          this.loadScript('assets/js/dashboards-analytics.js', () => {
            // Callback after loading all three scripts
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

}
