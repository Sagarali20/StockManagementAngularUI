import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { CustomelistComponent } from './customelist/customelist.component';


@NgModule({
  declarations: [
    NewcustomerComponent,
    CustomelistComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
