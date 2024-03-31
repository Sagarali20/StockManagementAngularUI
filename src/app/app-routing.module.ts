import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { AllusersComponent } from './components/allusers/allusers.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { DashboarduiComponent } from './components/dashboardui/dashboardui.component';
import { CategoryComponent } from './components/Admin/pages/category/category.component';
import { ProductComponent } from './components/Admin/pages/product/product.component';
import { ProductdetailsComponent } from './components/Admin/pages/productdetails/productdetails.component';
import { CustomerComponent } from './components/Admin/pages/customer/customer.component';
import { ServiceComponent } from './components/Admin/pages/service/service.component';
import { ReportComponent } from './components/Admin/pages/report/report.component';
import { XerrorComponent } from './components/Admin/pages/xerror/xerror.component';

const routes: Routes = [
  
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component : LoginComponent},
  {path:'signup', component:SignupComponent},

  {path:'dashboard', component:DashboardComponent,
  children:[
       {
          path:'alluser',
          component:AllusersComponent,
          canActivate:[AuthGuard]
        },
        {
           path:'category',
           component:CategoryComponent,
           canActivate:[AuthGuard]
         },
         {
           path:'product',
           component:ProductComponent,
           canActivate:[AuthGuard]
         },
         {
           path: 'product/details/:id', 
           component: ProductdetailsComponent,
           canActivate:[AuthGuard]
          },
          {
            path: 'customer', 
            component: CustomerComponent,
            canActivate:[AuthGuard]
           },
           {
            path: 'service', 
            component: ServiceComponent,
            canActivate:[AuthGuard]
           },  
           {
            path: 'report', 
            component: ReportComponent,
            canActivate:[AuthGuard]
           },           
           {
            path:'',
            component:DashboarduiComponent,
            canActivate:[AuthGuard]
            }


  ],
      canActivate:[AuthGuard]
},
{path:'**', component:XerrorComponent},

  // {path:'allusers', component:AllusersComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
