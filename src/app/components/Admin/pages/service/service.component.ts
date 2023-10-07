import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from 'src/app/models/Invoice';
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
  invoiceId:string='';
  invoice :Invoice = new Invoice();

  constructor(private SaleService:SaleServiceService ){}

  ngOnInit(): void {
     

  }
  GetInvoiceId()
  {
    this.SaleService.GetInvoiceId().subscribe({
      next:(async res=>{
        this.invoiceId=res.invoiceId;
        this.InvoiceForm.controls['invoiceid'].setValue(this.invoiceId);

        console.log(this.invoiceId);
      }),
      error:(err=>{
           console.log(err.error.message)
      })
    });  
  }
  onInputChange() {
    if (this.searchQuery.length >= 1) {  
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
    this.suggestions = [];
    this.showSuggestions = false;
  }
  selectSuggestion(suggestion: any) {
    console.log(suggestion);
    this.showSuggestions = false;
    this.invoice.Email=suggestion.emailAddress;
    this.invoice.PhoneNumber=suggestion.phoneNumber;
  }

  InvoiceForm= new FormGroup({
   id:new FormControl(""),
   invoiceid: new FormControl("",[Validators.required]),
   customerid:new FormControl("",[Validators.required]),
   amount : new FormControl("",[Validators.required]),
   tax:new FormControl(),
   totalamount:new FormControl("",[Validators.required]),
   deposite:new FormControl(),
   todaysadvance:new FormControl(),
   invoicedate : new FormControl(),
   paymenttype : new FormControl(),
   invoicedetails : new FormArray([])
  });

  AddInvoice()
  {

  }



}
