import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validationform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  type :string ="password";
  istext :boolean=false;
  eyeicon:string="fa-eye-slash" 
  loginForm!: FormGroup;

 constructor(
   private fb:FormBuilder,
   private authService :AuthService,
   private router:Router,
   private toast:NgToastService,
   private userstore:UserStoreService)
 {


 }

  ngOnInit() {

    // this.todosStore.getState().loadTodos();

    this.loginForm=this.fb.group({  
    
      username:['',[Validators.required]],
      password :['',Validators.required]
    })
  }

  hideShowPass()
  {
    this.istext=!this.istext;
    this.istext ? this.eyeicon='fa-eye':this.eyeicon='fa-eye-slash';
    this.istext ? this.type='text':this.type='password';
  }

  onsubmit()
  {
    if(this.loginForm.valid)
    {   
      this.authService.logIn(this.loginForm.value).subscribe({
        next:(res) =>{
          console.log(res);
          if(res.result)
          {

            console.log(res.token);
            this.authService.storeToken(res.accessToken);
            this.authService.storeRefreshToken(res.refreshToken);
            let tokenPayload=this.authService.deCodedToken();
            this.userstore.setFullNameFromStore(tokenPayload.unique_name);
            this.userstore.SetRoleFromStore(tokenPayload.role);
            this.toast.success({
              detail: "SUCCESS", summary: res.message, duration: 3000,
              type: 'success'
            });
    
            this.router.navigate(['dashboard']);
          //  window.location.href='/dashboard';

          }
        }, 
        error:(err)=>{
          // this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000});
          console.log(err);

        }
      })  
       //database

       console.log(this.loginForm.value)
    }
    else{

      validateForm.ValidateAllFromField(this.loginForm);

    }

  }



}
