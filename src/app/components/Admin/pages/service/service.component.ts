import { Component, OnInit } from '@angular/core';
import { SaleServiceService } from 'src/app/services/sale-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  searchQuery: string = '';
  suggestions: any[] = [];
  showSuggestions: boolean = false;



  constructor(private SaleService:SaleServiceService ){}

  ngOnInit(): void {

    this.SaleService.GetCustomerBySearch("sa").subscribe({

      next:(async res=>{

        console.log(res);

      }),
      error:(err=>{
           console.log(err.error.message)
      })

    });
  }

  onInputChange() {
    if (this.searchQuery.length >= 1) {
      // this.suggestionService.getSuggestions(this.searchQuery).subscribe((data) => {
      //   this.suggestions = data;
      // });

      this.SaleService.GetCustomerBySearch(this.searchQuery).subscribe({

        next:(async res=>{
  
          console.log(res.customers);
          this.suggestions=res.customers;
          this.showSuggestions=true;
  
        }),
        error:(err=>{
             console.log(err.error.message)
        })
  
      });
    } else {
      this.suggestions = [];
    }
  }

  onFocus() {
    // Clear suggestions and hide the suggestion list when the input gains focus
    this.suggestions = [];
    this.showSuggestions = false;
  }
  selectSuggestion(suggestion: any) {
    // Set the selected suggestion as the search query and hide the suggestion list
    console.log(suggestion);
    this.showSuggestions = false;
  }

}
