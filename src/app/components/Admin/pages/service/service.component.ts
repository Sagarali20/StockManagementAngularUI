import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formProductDetails!: FormArray<any>;

  constructor(private builder:FormBuilder, private SaleService:SaleServiceService ){}

  ngOnInit(): void {
     

  }
  GetInvoiceId()
  {
    this.SaleService.GetInvoiceId().subscribe({
      next:(async res=>{
        this.invoiceId=res.invoiceId;

        console.log(this.invoiceId);
      }),
      error:(err=>{
           console.log(err.error.message)
      })
    });  
  }
  onInputChange() {

    console.log(this.InvoiceForm.value.customerName!);
    if (this.InvoiceForm.value.customerName!.length >= 1) {  
  
      this.SaleService.GetCustomerBySearch(this.InvoiceForm.value.customerName!).subscribe({
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
    this.InvoiceForm.controls['invoiceid'].setValue(this.invoiceId);
    this.InvoiceForm.controls['customerName'].setValue(suggestion.firstName+" "+suggestion.lastName);
    console.log(this.InvoiceForm.value.customerName);
    this.invoice.Email=suggestion.email;
    this.invoice.PhoneNumber=suggestion.phoneNumber
  }

  InvoiceForm=this.builder.group({
   id:new FormControl(""),
   customerName:new FormControl(""),
   invoiceid: new FormControl("",[Validators.required]),
   customerid:new FormControl("",[Validators.required]),
   amount : new FormControl("",[Validators.required]),
   tax:new FormControl(),
   totalamount:new FormControl("",[Validators.required]),
   deposite:new FormControl(),
   todaysadvance:new FormControl(),
   invoicedate : new FormControl(),
   paymenttype : new FormControl(),
   email : new FormControl(),
   invoicedetails : new FormArray([])
  });

  AddInvoiceDetails()
  {
    this.formProductDetails=this.InvoiceForm.get("invoicedetails") as FormArray;
    this.formProductDetails.push(this.GenerateRow)
  }
  GenerateRow()
  {
    return this.builder.group({

    });
  }

}
