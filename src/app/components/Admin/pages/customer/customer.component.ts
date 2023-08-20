import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

  @ViewChild('customerForm') customerForm: any;

  ngOnInit(): void {

    setInterval(() => {


    }, 3000); // Interv
    
    

  }
  AddClick()
  {
    this.customerForm.AddClick();

  }





}
