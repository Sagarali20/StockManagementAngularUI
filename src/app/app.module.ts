import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { User } from './models/User';
import { NgToastModule } from 'ng-angular-popup'
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AllusersComponent } from './components/allusers/allusers.component';
import { SidebarComponent } from './components/Admin/sidebar/sidebar.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { DashboarduiComponent } from './components/dashboardui/dashboardui.component';
import { CategoryComponent } from './components/Admin/pages/category/category.component';
import { ProductComponent } from './components/Admin/pages/product/product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductdetailsComponent } from './components/Admin/pages/productdetails/productdetails.component';
import { UtcToLocalTimePipe } from './Utc-pipe/utc-to-local-time.pipe';
import { UtcConverterService } from './Utc-converter/utc-converter.service';
import { CustomerComponent } from './components/Admin/pages/customer/customer.component';
import { ServiceComponent } from './components/Admin/pages/service/service.component';
import { ReportComponent } from './components/Admin/pages/report/report.component';
import { CustomeformComponent } from './components/Admin/pages/customeform/customeform.component';
import { XerrorComponent } from './components/Admin/pages/xerror/xerror.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AllusersComponent,
    SidebarComponent,
    DashboardComponent,
    DashboarduiComponent,
    CategoryComponent,
    ProductComponent,
    ProductdetailsComponent,
    UtcToLocalTimePipe,
    CustomerComponent,
    ServiceComponent,
    ReportComponent,
    CustomeformComponent,
    XerrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    NgSelectModule,
    FormsModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot()
    
  ],
  providers: [{
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptor,
  multi:true

  },User,UtcConverterService],

  bootstrap: [AppComponent]
})
export class AppModule { }
