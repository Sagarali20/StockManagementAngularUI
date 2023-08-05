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
          path:'',
          component:DashboarduiComponent,
           canActivate:[AuthGuard]
         }
  ],
      canActivate:[AuthGuard]
},

  // {path:'allusers', component:AllusersComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
