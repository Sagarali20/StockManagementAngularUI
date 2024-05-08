import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private router:Router,private toast: NgToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken=this.auth.getToken();
    if(myToken)
    {
      request=request.clone({
        setHeaders:{authorization:`Bearer ${myToken}`}
      });
    }
  return next.handle(request).pipe(
      catchError((err:any)=>{
        console.log(err);
        if(err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            // this.toast.warning({detail:"warning",summary:"Token is expried, Login again"});
            // this.router.navigate(['login']);
          return this.handleUnAuthorizedError(request,next);
          }
          if(err.status===400 || err.status===404)
          {
            this.toast.error({
              detail: "ERROR", summary: err.error.message, duration: 3000,
              type: 'error'
            });
          }
        }
        return throwError(()=>new Error("Some other error ocncured"));
      })
    );
  }

  handleUnAuthorizedError(req:HttpRequest<any>,next:HttpHandler)
  {  
     let tokenApiModel= new TokenApiModel();
     tokenApiModel.accessToken=this.auth.getToken()!;
     tokenApiModel.refreshToken=this.auth.getRefreashToken()!;

     return this.auth.renewtoken(tokenApiModel)
     .pipe(
      switchMap((data:TokenApiModel)=>{
       this.auth.storeRefreshToken(data.refreshToken);
       this.auth.storeToken(data.accessToken);      
       req=req.clone({
        setHeaders:{authorization:`Bearer ${data.accessToken}`}
      });
         return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({
            detail: "warning", summary: "Token is expried, Login again",
            type: 'error'
          }); 
          this.router.navigate(['login']);
        })
      })
     )
  }
}
