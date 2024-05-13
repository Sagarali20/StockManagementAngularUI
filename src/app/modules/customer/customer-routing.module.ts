import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomelistComponent } from './customelist/customelist.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';

const routes: Routes = [
{
  path:'',
  redirectTo:'list',
  pathMatch:'full'
},
{
    path:'list',
    component:CustomelistComponent
},
{
  path:'new-customer',
  component:NewcustomerComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
