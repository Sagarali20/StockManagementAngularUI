import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { Stockfilter } from 'src/app/models/Stockfilter';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  @ViewChild('customerForm') customerForm: any;
  Customers:Customer[]=[];
  totalcount!:0;
  isChecked: boolean = false;
  checked!: boolean;


  Stockfilter: Stockfilter = new Stockfilter;


  constructor(private customerservice:CustomerService)
  {

  }

  ngOnInit(): void {
    this.Stockfilter.PageNo=1;

    // setInterval(() => {


    // }, 3000); // Interv
    
    this.RefreshPage();



  }
  AddClick()
  {
    this.customerForm.AddClick();
  }
  toggle(): void {
    this.isChecked = !this.isChecked;
  }

  RefreshPage()
  {
    

    this.customerservice.GetAllCustomers(this.Stockfilter).subscribe({
      next:(async res=>{

        this.Customers=res.customers;
        console.log(res);
  

      }),
      error:(err=>{
           console.log(err.error.message)
      })
    })

  }






}
