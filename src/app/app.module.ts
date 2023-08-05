import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TodosStore } from './services/todos-store.service';

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
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [{
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptor,
  multi:true

  },User,TodosStore],

  bootstrap: [AppComponent]
})
export class AppModule { }
